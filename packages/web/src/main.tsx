import { hydrateRoot, createRoot } from "react-dom/client";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { renderRoutes } from "react-router-layout";
import { HelmetProvider } from "react-helmet-async";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { reducers } from "./context";
import { RootContextProvider } from "react-reducer-ssr";

declare global {
  interface Window { INITIAL_STATE: any; }
}

const isServerSide = window.INITIAL_STATE;

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const c = (<HelmetProvider>
  <RootContextProvider reducer={reducers} initialState={window.INITIAL_STATE}>
    <Router><Routes>{renderRoutes(routes)}</Routes></Router>
  </RootContextProvider>
</HelmetProvider>);

const container = document.getElementById("app");

if(isServerSide) {
  const root = hydrateRoot(container!, c);
}
else {
  const root = createRoot(container!);
  root.render(c);
}
