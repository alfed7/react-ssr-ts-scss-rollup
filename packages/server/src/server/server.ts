
import cookieParser from "cookie-parser";
import express from 'express';
import compression from 'compression';
import dotenv from "dotenv";

import path from "path";
import parseUrl from "parseurl";
const parseResult = dotenv.config();
if (parseResult.error) {
  console.log(parseResult.error);
}

import { renderHtml } from "./ssr";
import { matchRoutes } from "react-router";

import { fileURLToPath } from 'url';

import { reducers } from "@webssr/web";

import { createServerStore, DispatchFunction } from 'react-reducer-ssr'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const appRootDirectory = __dirname;
const appBundleDirectory = path.join(appRootDirectory, "../../../web/build/client");

export type LoadDataFunction = (dispatch: DispatchFunction,
  cookies: {}, urlSearch: string | null) => Promise<void>;
export type RouteObjectSsr = {
  loadData?: LoadDataFunction,
  component: any,
  isNotFound?: boolean
}

const ssr = (routes: any) => (
  req: express.Request, res: express.Response, next: express.NextFunction) => {
  const url_parts = parseUrl(req);
  const urlSearch = url_parts ? url_parts.search : "";
  const urlPath = url_parts ? url_parts.pathname : "";

  const matches = matchRoutes(routes, urlPath || '');
  if (!matches) {
    res.statusCode = 404;
    next("Not found");
    return;
  }

  const store = createServerStore(reducers, {} as any);
  const promises = matches
    .map(({ route }) => {
      const r = route as RouteObjectSsr;
      return r.loadData ? (r.loadData(store.dispatch, req.cookies, urlSearch)) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return;
    });
  Promise.all(promises)
    .then(() => {
      const content = renderHtml(routes, req, store);

      // It's better to handle redirects on a client because of a browser cache.
      sendResponse(res, content);
      next();
    })
    .catch((err) => {
      sendResponse(res, "Error happens: " + err);
      next();
    });
};

function sendResponse(res: express.Response, content: string) {
  res.statusCode = res.statusCode || 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.end(content);
}
// Create server
export function createHttpServer(routes: any): express.Express {
  const app = express();

  app.use(compression());
  app.use(express.static(appBundleDirectory, {index: false}));
  app.use(cookieParser());
  const ssrRoutine = ssr(routes);
  app.get('*', ssrRoutine);
  app.post('*', ssrRoutine);

  return app;
}
