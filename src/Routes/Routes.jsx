import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import { HomePage } from "../pages/Home/HomePage";
import RegisterPage from "../pages/Register/RegisterPage";
import SignInPage from "../pages/SignIn/SignIn";
import MovieDetailsPage from "../pages/Details/MovieDetailsPage";

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
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/sign-in",
        Component: SignInPage,
      },
      {
        path: "/movie/details/:id",
        Component: MovieDetailsPage,
      },
    ],
  },
]);
