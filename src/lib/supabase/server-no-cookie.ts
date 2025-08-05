import { Database } from '@/types';
import { createClient as createClientSupabase } from '@supabase/supabase-js';

export const createClient = async (locale?: string) => {
	return createClientSupabase<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		locale ? {
			global: {
				headers: {
					'language': locale,
				}
			}
		} : undefined
	);
};