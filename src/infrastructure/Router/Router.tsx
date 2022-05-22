import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import routes from 'config/routes';
import { Suspense } from 'react';
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
          <Suspense fallback={
            <Box
              sx={{
                height: '100vh',
                display: 'grid',
                placeContent: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          }>
            <Route
              isPrivate={isPrivate}
              loginPath={loginPath}
              shouldRedirectIfAuthenticated={shouldRedirectIfAuthenticated}
              authRedirectPath={authRedirectPath}
              element={element}
            />
          </Suspense>
        ),
      })
    )
  );

export default Router;
