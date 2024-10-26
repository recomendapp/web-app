import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";

export const getReview = cache(async (id: string, lang: string) => {
	const supabase = createServerClient(lang);
	const { data: review, error } = await supabase
	  .from('review')
	  .select('*, user(*), movie(*)')
	  .eq('id', id)
	  .maybeSingle();
	if (error) throw error;
	return review;
});