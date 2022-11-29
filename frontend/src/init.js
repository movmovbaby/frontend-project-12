import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from './locales/index.js';
import { Provider as StoreProvider } from 'react-redux';
import store from './slices/index.js';
import App from './components/App.jsx';
import { io } from 'socket.io-client';

const init = async () => {
  const socket = io();
  const i18nInstance = i18n.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
    });

  return (
    <I18nextProvider i18n={i18nInstance}>
      <StoreProvider store={store}>
        <App socket={socket} />
      </StoreProvider>
    </I18nextProvider>
  )
};

export default init;
