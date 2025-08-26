import { createBrowserClient } from "@supabase/ssr";
import { useLocale } from "next-intl"
import { routing } from "../i18n/routing";
import { useMemo } from "react";
import { Database } from "@recomendapp/types/dist";

export const useSupabaseClient = () => {
	const locale = useLocale();
	
	const supabase = useMemo(() => {
		return createBrowserClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				global: {
					headers: {
						'language': locale ?? routing.defaultLocale,
					}
				},
			},
		);
	}, [locale]);

	return supabase;
};
