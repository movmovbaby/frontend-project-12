import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './components/App.jsx';

const init = async () => {
  const socket = io();
  const i18nInstance = i18n.createInstance();

  const rollbarConfig = {
    accessToken: '74bc07850c6f47229b2c36a0b6b1a62f',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  await i18nInstance
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18nInstance}>
          <StoreProvider store={store}>
            <App socket={socket} />
          </StoreProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
