import { useRoutes } from "react-router-dom";

import routes from 'config/routes';
import Route from "./Route";

const Router = () => useRoutes(
    routes.map(({
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
        )
    }))
);

export default Router;
