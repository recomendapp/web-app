import { createClient as createClientSupabase } from '@supabase/supabase-js';
import { getLocale } from 'next-intl/server';
import { routing } from '../i18n/routing';

export const createClient = async (localeParam?: string) => {
  const locale = localeParam ?? await getLocale() ?? routing.defaultLocale;
  return createClientSupabase<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	{
	  global: {
		headers: {
		  'language': locale,
		}
	  }
	}
  );
};