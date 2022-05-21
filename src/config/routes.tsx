import Home from 'ui/screens/Home';
import Login from 'ui/screens/Login';
import Signup from 'ui/screens/Signup';

import type { CustomRoute } from "infrastructure/Router/Route";

export enum Routes {
  Home = "/",
  Login = "/login",
  Signup = "/signup",
}

const appRoutes: Array<CustomRoute> = [
  { path: Routes.Home, element: <Home />, isPrivate: true },
  {
    path: Routes.Login,
    element: <Login />,
    shouldRedirectIfAuthenticated: true,
  },
  {
    path: Routes.Signup,
    element: <Signup />,
    shouldRedirectIfAuthenticated: true,
  },
];

export default appRoutes;
