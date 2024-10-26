import { getIdFromSlug } from "@/hooks/get-id-from-slug";
import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";

export const getPerson = cache(async (id: string, lang: string) => {
	const { id: personId } = getIdFromSlug(id);
	const supabase = createServerClient(lang);
	const { data: person, error } = await supabase
	  .from('person_full')
	  .select(`*`)
	  .eq('id', personId)
	  .maybeSingle();
	if (error) throw error;
	return person;
  })