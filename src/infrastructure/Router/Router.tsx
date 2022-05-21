import routes from 'config/routes';
import { useRoutes } from 'react-router-dom';

import Route from './Route';

const Router = () =>
  useRoutes(
    routes.map(
      ({
        isPrivate,
        loginPath,
        shouldRedirectIfAuthenticated,
        authRedirectPath,
        element,
        ...routeConfig
      }) => ({
        ...routeConfig,
        element: (
          <Route
            isPrivate={isPrivate}
            loginPath={loginPath}
            shouldRedirectIfAuthenticated={shouldRedirectIfAuthenticated}
            authRedirectPath={authRedirectPath}
            element={element}
          />
        ),
      })
    )
  );

export default Router;
