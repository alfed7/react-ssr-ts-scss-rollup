import App from "../App";
import { HomeView, AboutView, ShibeView, NotFoundPage } from "../views";
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
        ...AboutView,
        layout: MainLayout,
        path: "/about",
      },
      {
        ...ShibeView,
        layout: MainLayout,
        path: "/shibe",
      },
      {
        ...NotFoundPage,
        layout: MainLayout,
        isNotFound: true,
        path: "*",
      },
    ],
  },
];
