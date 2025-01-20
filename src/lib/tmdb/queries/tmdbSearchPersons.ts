"use server"

import { routing } from "@/lib/i18n/routing";
import { createServerClient } from "@/lib/supabase/server";
import { Person } from "@/types/type.db";
import { z } from "zod";

const searchPersonsSchema = z
	.object({
		query: z
			.string(),
		language: z
			.string()
			.optional(),
		page: z
			.number()
			.optional(),
		numberofresult: z
			.number()
			.optional(),
	})

export const tmdbSearchPersons = async (query: string, language = routing.defaultLocale, page = 1) => {
	const supabase = createServerClient(language);
	const verifiedField = searchPersonsSchema.safeParse({ query, language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const tmdbResults = await (
		await fetch(
			`${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/person?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
		)
	).json();
	const request = await supabase
		.from('person')
		.select('*')
		.in('id', tmdbResults.results.map((person: any) => person.id))
		.limit(20);
	
	const persons: Person[] = tmdbResults.results.map((person: any) => request.data?.find((m: any) => m.id === person.id));

	return persons;
}
