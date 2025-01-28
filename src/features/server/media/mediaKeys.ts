import { MediaType } from "@/types/type.db";
import { createTag } from "../create-tag";

export const mediaKeys = {
	all: ({
		locale
	} : {
		locale?: string;
	}) => locale ? [locale, 'media'] : ['media'],

	detail: ({
		locale,
		id,
		type,
	} : {
		locale?: string;
		id: number;
		type: MediaType;
	}) => [...mediaKeys.all({ locale }), type, String(id)],

	/* -------------------------------------------------------------------------- */
	/*                                    MOVIE                                   */
	/* -------------------------------------------------------------------------- */
	movieReviews: ({
		locale,
		id,
		filters
	} : {
		locale?: string;
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
		locale?: string;
		id: number;
	}) => [...mediaKeys.detail({ locale, id, type: 'person' }), 'combined-credits'],
	personFilms: ({
		locale,
		id,
		filters
	} : {
		locale?: string;
		id: number;
		filters?: any
	}) => filters ? [...mediaKeys.detail({ locale, id, type: 'person' }), 'films', JSON.stringify(filters)] : [...mediaKeys.detail({ locale, id, type: 'person' }), 'films'],

	/* -------------------------------------------------------------------------- */
}