import './styles/css/main.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from './context/AppContext';
import AppRoutes from './routes/AppRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
      <Router>
        <AppRoutes />
      </Router>
    </AppContext>
  </StrictMode>
);
