'use client'

import createClient from "@recomendapp/api-js";
import { createContext, use, useMemo } from "react";
import { useAuth } from "./auth-context";
import { useT } from "@/lib/i18n/client";

const ApiContext = createContext<ReturnType<typeof createClient> | undefined>(undefined);

export const ApiProvider = ({
	children,
} : {
	children: React.ReactNode;
}) => {
	const { i18n } = useT();
	const { session } = useAuth();
	const api = useMemo(() => {
		return createClient({
			token: session?.access_token,
			language: i18n.resolvedLanguage,
		});
	}, [session, i18n.resolvedLanguage]);
	return (
		<ApiContext.Provider value={api}>
			{children}
		</ApiContext.Provider>
	);
}

export const useApiClient = () => {
	const context = use(ApiContext);
	if (!context) {
		throw new Error('useApiClient must be used within a ApiProvider');
	}
	return context;
};