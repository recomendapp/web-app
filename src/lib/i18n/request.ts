import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getFallbackLanguage } from './fallback';
import deepmerge from 'deepmerge';
import { SupportedLocale } from '@/translations/locales';


export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as SupportedLocale)) {
    locale = routing.defaultLocale;
  }

  let messages = {};
  try {
    messages = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {}
  const fallbackLocale = locale ? getFallbackLanguage({ locale }) : undefined;
  if (fallbackLocale !== locale) {
    let messagesFallback = {};
    try {
      messagesFallback = (await import(`../../translations/${fallbackLocale}.json`)).default;
    } catch (error) {}
    messages = deepmerge(messagesFallback, messages);
  }


  return {
    locale,
    messages: messages,
  };
});