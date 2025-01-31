import { createServerClient } from "@/lib/supabase/server";
import { UserReview } from "@/types/type.db";
import { cache } from "react";

export const getReview = cache(async (id: number, lang: string) => {
	const supabase = await createServerClient();
	const { data: review, error } = await supabase
	  .from('user_review')
	  .select('*, activity:user_activity(*, media(*), user(*))')
	  .eq('id', id)
	  .returns<UserReview[]>()
	  .maybeSingle();
	if (error) throw error;
	return review;
});