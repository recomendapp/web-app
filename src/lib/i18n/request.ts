import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';
import { getFallbackLanguage } from './fallback';
import deepmerge from 'deepmerge';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  let messages = {};
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {}
  let messagesFallback = {};
  try {
    messagesFallback = (await import(`../../messages/${getFallbackLanguage({ locale })}.json`)).default;
  } catch (error) {}
 
  return {
    messages: deepmerge(messagesFallback, messages),
  };
});
