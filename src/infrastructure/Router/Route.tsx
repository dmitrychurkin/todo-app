import { Routes } from 'config/routes';
import { useSession } from 'providers/Session';
import { Navigate, useLocation } from 'react-router-dom';

import type { FC, PropsWithChildren } from "react";
import type { RouteObject } from "react-router-dom";

export interface CustomRoute extends RouteObject {
  readonly isPrivate?: boolean;
  readonly shouldRedirectIfAuthenticated?: boolean;
  readonly authRedirectPath?: string;
  readonly loginPath?: string;
}

type Props = PropsWithChildren<CustomRoute>;

const PrivateRoute: FC<PropsWithChildren<Pick<Props, "loginPath">>> = ({
  children,
  loginPath,
}) => {
  const user = useSession();
  const { pathname } = useLocation();

  if (user === null) {
    return (
      <Navigate
        to={loginPath!}
        replace
        state={{
          redirectUrl: pathname,
        }}
      />
    );
  }

  return <>{user && children}</>;
};

const RedirectIfAuthenticatedRoute: FC<
  PropsWithChildren<Pick<Props, "authRedirectPath">>
> = ({ children, authRedirectPath }) => {
  const user = useSession();
  const { state } = useLocation();

  const s = state as { redirectUrl: string } | null;

  if (user) {
    return (
      <Navigate
        to={s?.redirectUrl || authRedirectPath!}
        replace
        state={{
          redirectUrl: undefined,
        }}
      />
    );
  }

  if (typeof user !== "undefined") {
    return <>{children}</>;
  }

  return null;
};

const Route: FC<Props> = ({
  element,
  isPrivate,
  shouldRedirectIfAuthenticated,
  authRedirectPath = Routes.Home,
  loginPath = Routes.Login,
}) => {
  if (isPrivate) {
    return (
      <PrivateRoute
        children={element}
        loginPath={loginPath}
      />
    );
  }

  if (shouldRedirectIfAuthenticated) {
    return (
      <RedirectIfAuthenticatedRoute
        children={element}
        authRedirectPath={authRedirectPath}
      />
    );
  }

  return <>{element}</>;
};

export default Route;
