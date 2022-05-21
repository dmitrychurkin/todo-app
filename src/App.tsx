import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import firebaseConfig from 'config/auth';
import { initializeApp } from 'firebase/app';
import AppRouter from 'infrastructure/Router';
import Layout from 'providers/Layout';
import Session from 'providers/Session';
import Theme from 'providers/Theme';
import { BrowserRouter } from 'react-router-dom';

initializeApp(firebaseConfig);

const App = () => (
  <BrowserRouter>
    <Layout>
      <Theme>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Session>
            <AppRouter />
          </Session>
        </LocalizationProvider>
      </Theme>
    </Layout>
  </BrowserRouter>
);

export default App;
