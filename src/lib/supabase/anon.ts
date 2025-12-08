import { Database } from '@recomendapp/types';
import { createClient as createClientSupabase } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env';

export const createAnonClient = (locale?: string) => {
	return createClientSupabase<Database>(
		SUPABASE_URL,
		SUPABASE_ANON_KEY,
		locale ? {
			global: {
				headers: {
					'language': locale,
				}
			}
		} : undefined
	);
};