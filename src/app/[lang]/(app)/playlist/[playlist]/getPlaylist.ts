import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";

export const getPlaylist = cache(async (id: string) => {
	const supabase = createServerClient();
	const { data: playlist, error } = await supabase
		.from('playlist')
		.select('*, user(username)')
		.eq('id', id)
		.maybeSingle();
	if (error) throw error;
	return playlist;
});