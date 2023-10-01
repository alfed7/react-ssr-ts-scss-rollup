import App from "../App";
import { HomeView, AboutView, NotFoundPage } from "../views";
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
        ...NotFoundPage,
        layout: MainLayout,
        isNotFound: true,
        path: "*",
      },
    ],
  },
];
