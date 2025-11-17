import { MediaType, PlaylistType, UserReviewType } from "@recomendapp/types"

export const mediaKeys = {
	all: ['media'] as const,

	specify: ({
		type,
	} : {
		type: MediaType;
	}) => [type] as const,
	
	detail: ({
		id,
		type,
	} : {
		id: number;
		type: MediaType;
	}) => [...mediaKeys.specify({ type }), id] as const,

	/* --------------------------------- REVIEWS -------------------------------- */
	reviews: ({
		id,
		type,
		filters,
	} : {
		id: number;
		type: UserReviewType;
		filters?: any;
	}) => {
		const sub = [...(filters ? [filters] : [])];
		return [...mediaKeys.detail({ id, type }), 'reviews', ...sub] as const;
	},
	/* -------------------------------------------------------------------------- */

	/* -------------------------------- PLAYLISTS ------------------------------- */
	playlists: ({
		id,
		type,
		filters,
	} : {
		id: number;
		type: PlaylistType;
		filters?: any;
	}) => {
		const sub = [...(filters ? [filters] : [])];
		return [...mediaKeys.detail({ id, type }), 'playlists', ...sub] as const;
	},
	/* -------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------- */
	/*                                   PERSON                                   */
	/* -------------------------------------------------------------------------- */

	/* ------------------------------- FILMOGRAPHY ------------------------------ */
	mostRated: ({
		personId,
		filters,
	} : {
		personId: number;
		filters?: any;
	}) => filters ? [...mediaKeys.detail({ id: personId, type: 'person' }), 'mostRated', filters] as const : [...mediaKeys.detail({ id: personId, type: 'person' }), 'mostRated'] as const,
	/* -------------------------------------------------------------------------- */

	/* -------------------------------- PROVIDERS ------------------------------- */
	provider: ({
		provider,
		type,
	}: {
		provider: 'justwatch';
		type: MediaType;
	}) => [...mediaKeys.specify({ type }), 'provider', provider],
	/* -------------------------------------------------------------------------- */
}