import { Route } from 'react-router';
import RouteElementWithLayout from './RouteElementWithLayout';

export function renderRoutes(routes: any) {
  return routes ? (
      routes.map((route: any, i: number) => (
        <Route
          key={route.key || i}
          path={route.path}
          element={
            <RouteElementWithLayout
              component={route.component}
              layout={route.layout}
              menuCreator={route.menuCreator}
            />}
        >{renderRoutes(route.children)}</Route>
      ))
  ) : null;
}
