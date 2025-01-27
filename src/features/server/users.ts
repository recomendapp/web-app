import { createServerClient } from "@/lib/supabase/server";
import { Profile } from "@/types/type.db";
import { cache } from "react";

export const getProfile = cache(async (username: string) => {
	const supabase = createServerClient();
	const { data: user, error } = await supabase
		.from('profile')
		.select('*')
		.eq('username', username)
		.returns<Profile[]>()
		.maybeSingle();
	if (error) throw error;
	return user;
});