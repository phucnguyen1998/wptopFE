import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/configureStore'
import { CssBaseline, ThemeProvider } from '@mui/material'
import './services/config'
import APP_THEME from './constants/theme'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { languagesResources } from './constants/common'
import { BrowserRouter } from "react-router-dom";


i18next.use(initReactI18next).init({
  resources: languagesResources,
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={APP_THEME}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
