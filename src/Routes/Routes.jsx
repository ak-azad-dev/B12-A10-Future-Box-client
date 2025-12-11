import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import { HomePage } from "../pages/Home/HomePage";
import RegisterPage from "../pages/Register/RegisterPage";
import SignInPage from "../pages/SignIn/SignIn";
import MovieDetailsPage from "../pages/Details/MovieDetailsPage";
import AllMoviesPage from "../pages/Movies/AllMoviesPage";
import AddMoviePage from "../pages/Movies/AddMoviePage";
import UpdateMoviePage from "../pages/Movies/UpdateMoviePage";

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
        path: "/movies",
        Component: AllMoviesPage,
      },
      {
        path: "/movie/add",
        Component: AddMoviePage,
      },
      {
        path: "/movie/edit/:id",
        Component: UpdateMoviePage,
      },
      {
        path: "/movie/details/:id",
        Component: MovieDetailsPage,
      },
    ],
  },
]);
