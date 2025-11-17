import { cookies } from 'next/headers';
import {
  createServerClient as createServerClientSupabase,
} from '@supabase/ssr';
import { routing } from '../i18n/routing';
import { Database } from '@recomendapp/types';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env';

export const createServerClient = async (localeParam?: string) => {
  const cookieStore = await cookies();
  const locale = localeParam ?? routing.defaultLocale;
  return createServerClientSupabase<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      global: {
        headers: {
          'language': locale,
        }
      }
    },
  );
};