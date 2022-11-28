import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from '../locales/index.js';

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .init({
    lng: 'ru',
    debug: false,
    resources,
  });

const I18nProvider = ({ children }) => {
  <I18nextProvider i18n={i18nInstance}>
    {children}
  </I18nextProvider >
}

export default I18nProvider;
