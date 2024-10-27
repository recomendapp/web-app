import { cookies } from 'next/headers';
import {
  createServerClient as createServerClientSupabase,
  type CookieOptions,
} from '@supabase/ssr';
import { routing } from '../i18n/routing';

export const createServerClient = (localeParam?: string) => {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE');
  return createServerClientSupabase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
          'language': locale?.value ?? localeParam ?? routing.defaultLocale,
        }
      }
    },
  );
};

// export const supabase = createServerClient();

export async function getSession() {
  const supabase = createServerClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('unit_amount', {
      referencedTable: 'prices',
      ascending: true,
      nullsFirst: true,
    });
  if (error) console.error(error);
  return data || [];
};

export async function getSubscriptionByUserId() {
  const supabase = createServerClient();
  try {
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
