import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles, { theme } from './assets/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { createPortal } from 'react-dom';
import { Modal } from './components/Modal';
import { Alert } from './components/Alert';

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GlobalStyles />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
                <Modal />
                <Alert />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
