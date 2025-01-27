import { createServerClient } from "@/lib/supabase/server";
import { UserReview } from "@/types/type.db";
import { cache } from "react";

export const getReview = cache(async (id: number, lang: string) => {
	const supabase = createServerClient();
	const { data: review, error } = await supabase
	  .from('user_review_media_activity')
	  .select('*, user(*)')
	  .eq('id', id)
	  .returns<UserReview[]>()
	  .maybeSingle();
	if (error) throw error;
	return review;
});