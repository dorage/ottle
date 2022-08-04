import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './app/firebase';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles, { theme } from './assets/styles/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Modal } from './components/Modal';
import { Alert } from './components/Alert';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
    dsn:
        'https://6ccc0d4e27364b14b72795f9e6dc039d@o416022.ingest.sentry.io/6624563',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
    <>
        <GlobalStyles />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                    <Modal />
                    <Alert />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
