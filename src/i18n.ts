import { getRequestConfig } from 'next-intl/server';
import { createServerClient } from './lib/supabase/server';
import { locales } from './lib/next-intl/navigation';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  // if user is connected, we can get the locale from the user
  // if user is not connected, we can get the locale from the browser
  let localeToUse = locale;
  if (!locales.includes(locale as any)) notFound();
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: user_data, error } = await supabase
      .from('user')
      .select('language')
      .eq('id', user.id)
      .single();
    if (!error && user_data)
      locale = user_data.language;
  }
  return ({
    locale: localeToUse,
    messages: (await import(`./dictionaries/${locale}.json`)).default,
  })
});
