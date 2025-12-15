"use client"

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";
import { Database } from "@recomendapp/types";
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, use, useMemo } from "react";
import { useT } from "@/lib/i18n/client";
import { fallbackLng } from "@/lib/i18n/settings";

const SupabaseContext = createContext<SupabaseClient<Database> | undefined>(undefined);

export const SupabaseProvider = ({
	children,
} : {
	children: React.ReactNode;
}) => {
	const { i18n } = useT();
	const supabase = useMemo(() => {
		const client = createBrowserClient<Database>(
			SUPABASE_URL,
			SUPABASE_ANON_KEY,
			{
				global: {
					headers: {
						'language': i18n.resolvedLanguage ?? fallbackLng,
					}
				},
			},
		);

		(client.auth as any).suppressGetSessionWarning = true;

		return client;
	}, [i18n.resolvedLanguage]);

	return (
		<SupabaseContext.Provider value={supabase}>
			{children}
		</SupabaseContext.Provider>
	);
}

export const useSupabaseClient = () => {
	const context = use(SupabaseContext);
	if (!context) {
		throw new Error('useSupabaseClient must be used within a SupabaseProvider');
	}
	return context;
};