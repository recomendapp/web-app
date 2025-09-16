import { useSupabaseClient } from "@/context/supabase-context";
import { useState } from "react";

export const useUsernameAvailability = () => {
	const supabase = useSupabaseClient();
	const [isAvailable, setIsAvailable] = useState<boolean | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const reset = () => {
		setIsAvailable(undefined);
		setIsLoading(false);
	}

	const check = async (username: string) => {
		try {
			setIsAvailable(undefined);
			setIsLoading(true);
			const { data, error } = await supabase
				.from('profile')
				.select('username')
				.ilike('username', username)
				.maybeSingle();
			if (error) throw error;
			setIsAvailable(data === null);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return { isAvailable, reset, isLoading, check };	
};