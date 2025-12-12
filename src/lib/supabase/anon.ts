import { Database } from '@recomendapp/types';
import { createClient as createClientSupabase, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env';

const clientCache = new Map<string, SupabaseClient<Database>>();

export const createAnonClient = (locale: string = 'default') => {
    if (clientCache.has(locale)) {
        return clientCache.get(locale)!;
    }

    const newClient = createClientSupabase<Database>(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            auth: {
                persistSession: false, 
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
            global: {
                headers: {
                    'language': locale,
                }
            }
        }
    );

    clientCache.set(locale, newClient);

    return newClient;
};