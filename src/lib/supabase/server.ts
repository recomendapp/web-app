import { cookies } from 'next/headers';
import {
  createServerClient as createServerClientSupabase,
} from '@supabase/ssr';
import { Database } from '@recomendapp/types';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env';
import { getLocale } from 'next-intl/server';
import { cache } from 'react';

export const createServerClient = cache(async () => {
  const cookieStore = await cookies();
  const locale = await getLocale();
  const client = createServerClientSupabase<Database>(
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

  (client.auth as any).suppressGetSessionWarning = true;

  return client;
});