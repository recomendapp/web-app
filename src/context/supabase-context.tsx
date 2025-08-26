"use client";

import { routing } from "@/lib/i18n/routing";
import { Database } from "@recomendapp/types";
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, use, useMemo } from "react";

const SupabaseContext = createContext<SupabaseClient<Database> | undefined>(undefined);

export const SupabaseProvider = ({
	children,
	locale,
} : {
	children: React.ReactNode;
	locale: string;
}) => {
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