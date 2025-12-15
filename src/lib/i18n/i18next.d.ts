import "i18next";

import translation from './dictionaries/en-US/translation.json';

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof translation;
    };
  }
}