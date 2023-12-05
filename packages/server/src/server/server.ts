
import cookieParser from "cookie-parser";
import express from 'express';
import compression from 'compression';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { reactSsr } from "react-ssr-web";

import path from "path";
const parseResult = dotenv.config();
if (parseResult.error) {
  console.log(parseResult.error);
}

import { reducers } from "@webssr/web";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appBundleDirectory = path.join(__dirname, "../../../web/build/client");
const htmlTemplatePath = path.join(appBundleDirectory, "index.html");

// Create server
export function createHttpServer(routes: any): express.Express {
  const app = express();

  app.use(compression());
  app.use(express.static(appBundleDirectory, {index: false}));
  app.use(cookieParser());
  const ssrRoutine = reactSsr(htmlTemplatePath, reducers, routes);
  app.get('*', ssrRoutine);
  app.post('*', ssrRoutine);

  return app;
}
