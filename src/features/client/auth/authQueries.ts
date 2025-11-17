import { useQuery } from "@tanstack/react-query"
import { authKeys } from "./authKeys"
import { useSupabaseClient } from "@/context/supabase-context";
import { CustomerInfo, Purchases } from "@revenuecat/purchases-js";

export const useAuthUser = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: authKeys.user(),
		queryFn: async () => {
			if (!userId) return null;
			const { data, error } = await supabase
				.from('user')
				.select('*')
				.eq('id', userId)
				.single();
			if (error) throw error;
			return data;	
		},
		enabled: !!userId,
	});
};

export const useAuthCustomerInfo = ({
	initialData,
	enabled = true,
} : {
	initialData?: CustomerInfo;
	enabled?: boolean;
}) => {
	return useQuery({
		queryKey: authKeys.customerInfo(),
		queryFn: async () => {
			return await Purchases.getSharedInstance().getCustomerInfo();
		},
		retry: 3,
		retryOnMount: true,
		initialData,
		enabled,
	})
};
