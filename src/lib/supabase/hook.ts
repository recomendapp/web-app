import { createBrowserClient } from "@supabase/ssr";
import { useLocale } from "next-intl"
import { routing } from "../i18n/routing";
import { useMemo } from "react";

export const useSupabaseClient = () => {
	const locale = useLocale();
	
	const supabase = useMemo(() => {
		return createBrowserClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				global: {
					headers: {
						'my-custom': 'testthis2',
					}
				},
			},
		);
	}, [locale]);

	console.log('supabase useSupabaseClient', supabase);

	return supabase;
};
