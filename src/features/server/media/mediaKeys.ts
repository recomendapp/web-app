import { MediaType } from "@/types/type.db";
import { createTag } from "../create-tag";

export const mediaKeys = {
	all: ({
		locale
	} : {
		locale?: string;
	}) => locale ? [locale, 'media'] : ['media'],

	specify: ({
		locale,
		type,
	} : {
		locale: string;
		type: MediaType;
	}) => [locale, type],

	detail: ({
		locale,
		id,
		type,
	} : {
		locale: string;
		id: number;
		type?: MediaType;
	}) => type
		? [...mediaKeys.specify({ locale, type }), String(id)]
		: [...mediaKeys.all({ locale }), String(id)],

	/* -------------------------------------------------------------------------- */
	/*                                    MOVIE                                   */
	/* -------------------------------------------------------------------------- */

	movieReviews: ({
		locale,
		id,
		filters
	} : {
		locale: string;
		id: number;
		filters?: any
	}) => filters ? [...mediaKeys.detail({ locale, id, type: 'movie' }), 'reviews', JSON.stringify(filters)] : [...mediaKeys.detail({ locale, id, type: 'movie' }), 'reviews'],
	/* -------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------- */
	/*                                   PERSON                                   */
	/* -------------------------------------------------------------------------- */
	personCombinedCredits: ({
		locale,
		id,
	} : {
		locale: string;
		id: number;
	}) => [...mediaKeys.detail({ locale, id, type: 'person' }), 'combined-credits'],
	personFilms: ({
		locale,
		id,
		filters
	} : {
		locale: string;
		id: number;
		filters: any
	}) => [...mediaKeys.detail({ locale, id, type: 'person' }), 'films', JSON.stringify(filters)],

	/* -------------------------------------------------------------------------- */
}