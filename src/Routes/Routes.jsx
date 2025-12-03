import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import { HomePage } from "../pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);
