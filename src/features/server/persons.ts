import { createServerClient } from "@/lib/supabase/server";
import { Person } from "@/types/type.db";
import { cache } from "react";

export const getPerson = cache(async (id: number) => {
	const supabase = createServerClient();
	const { data: person, error } = await supabase
		.from('person_full')
		.select(`*`)
		.eq('id', id)
		.returns<Person[]>()
		.maybeSingle();
	if (error) throw error;
	return person;
})

export const getPersonCombinedCredits = cache(async (id: number) => {
	const supabase = createServerClient();
	const { data: credits, error } = await supabase
		.from('media_person_combined_credits')
		.select(`*`)
		.eq('person_id', id)
		.order('popularity', { ascending: false, nullsFirst: false })
		.order('tmdb_popularity', { ascending: false, nullsFirst: false })
		.limit(10)
	if (error) throw error;
	return credits;
})

export const getPersonFilms = cache(async (id: number) => {
	const supabase = createServerClient();
	const { data: credits, error } = await supabase
		.from('media_person_combined_credits')
		.select(`*`)
		.eq('person_id', id)
		.eq('media_type', 'movie')
		.order('last_activity_date', { ascending: false, nullsFirst: false })
		.limit(10)
	if (error) throw error;
	return credits;
})

export const getPersonTvSeries = cache(async (id: number) => {
	const supabase = createServerClient();
	const { data: credits, error } = await supabase
		.from('media_person_combined_credits')
		.select(`*`)
		.eq('person_id', id)
		.eq('media_type', 'tv_serie')
		.order('last_activity_date', { ascending: false, nullsFirst: false })
		.limit(10)
	if (error) throw error;
	return credits;
})