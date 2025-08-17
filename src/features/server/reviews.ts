import { createServerClient } from "@/lib/supabase/server";
import { UserReviewMovie, UserReviewTvSeries } from "@/types/type.db";
import { cache } from "react";

export const getReviewMovie = cache(async (id: number, lang: string) => {
	const supabase = await createServerClient();
	const { data: review, error } = await supabase
	  .from('user_reviews_movie')
	  .select('*, activity:user_activities_movie(*, movie:media_movie(*), user(*))')
	  .eq('id', id)
	  .maybeSingle()
	  .overrideTypes<UserReviewMovie, { merge: false }>();
	if (error) throw error;
	return review;
});

export const getReviewTvSeries = cache(async (id: number, lang: string) => {
	const supabase = await createServerClient();
	const { data: review, error } = await supabase
	  .from('user_reviews_tv_series')
	  .select('*, activity:user_activities_tv_series(*, tv_series:media_tv_series(*), user(*))')
	  .eq('id', id)
	  .maybeSingle()
	  .overrideTypes<UserReviewTvSeries, { merge: false }>();
	if (error) throw error;
	return review;
});