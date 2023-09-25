import App from "../App";
import { HomeView, NotFoundPage } from "../views";
import { LandingLayout, MainLayout } from '../layouts';

export const routes = [
  {
    ...App,
    path: "/",
    children: [
      {
        ...HomeView,
        layout: MainLayout,
        path: "/",
      },
      {
        ...NotFoundPage,
        layout: LandingLayout,
        isNotFound: true,
        path: "*",
      },
    ],
  },
];
