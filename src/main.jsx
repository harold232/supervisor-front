import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import store from '../src/store/store';

import './index.css';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  </StrictMode>
);