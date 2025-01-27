import { MediaType } from "@/types/type.db"

export const mediaKeys = {
	all: ['media'] as const,
	
	detail: ({
		id,
		type,
	} : {
		id: number;
		type: MediaType;
	}) => [...mediaKeys.all, type, id] as const,

	/* --------------------------------- REVIEWS -------------------------------- */
	reviews: ({
		mediaId,
		mediaType,
		filters,
	} : {
		mediaId: number;
		mediaType: MediaType;
		filters?: any;
	}) => filters ? [...mediaKeys.detail({ id: mediaId, type: mediaType }), 'reviews', filters] as const : [...mediaKeys.detail({ id: mediaId, type: mediaType }), 'reviews'] as const,
	/* -------------------------------------------------------------------------- */

	/* -------------------------------- PLAYLISTS ------------------------------- */
	playlists: ({
		mediaId,
		mediaType,
		filters,
	} : {
		mediaId: number;
		mediaType: MediaType;
		filters?: any;
	}) => filters ? [...mediaKeys.detail({ id: mediaId, type: mediaType }), 'playlists', filters] as const : [...mediaKeys.detail({ id: mediaId, type: mediaType }), 'playlists'] as const,
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
}