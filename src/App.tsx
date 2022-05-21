import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import AppRouter from 'infrastructure/Router';
import Theme from 'providers/Theme';
import Session from 'providers/Session';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import firebaseConfig from 'config/auth';
import Layout from 'providers/Layout';

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
