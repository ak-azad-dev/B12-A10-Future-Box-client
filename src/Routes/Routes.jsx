import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { HomePage } from "../pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);
