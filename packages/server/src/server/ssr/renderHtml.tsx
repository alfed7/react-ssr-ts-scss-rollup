import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from 'react-router-dom/server'
import { Routes } from "react-router-dom";
import { renderRoutes } from "react-router-layout";
import { reducers } from "@webssr/web";
import { HelmetProvider } from "react-helmet-async";
import serialize from "serialize-javascript";
import { RootContextProvider } from "react-reducer-ssr";

export default (routes: any, req: any, store: any) => {
  const helmetContext: any = {};
  const contentJsx = <Router location={req.url}>
    <HelmetProvider context={helmetContext}>
      <RootContextProvider reducer={reducers} initialState={store?.root}>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </RootContextProvider>
    </HelmetProvider>
  </Router>;
  const content = renderToString(contentJsx);

  const { helmet } = helmetContext;
  const helmetTitle = (helmet && helmet.title) ? helmet.title.toString() : '';
  const helmetMeta = (helmet && helmet.meta) ? helmet.meta.toString() : '';

  const html = `<!DOCTYPE html>
  <html>
    <head>
      ${helmetTitle}
      ${helmetMeta}
      <link rel="icon" href="/appIcon.svg" />
      <link rel="stylesheet" href="/main.css">
      <script src="/main.js" defer></script>
    </head>
    <body>
      <div id="app">${content}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.root)}
      </script>
    </body>
  </html>`;
  return html;
};
