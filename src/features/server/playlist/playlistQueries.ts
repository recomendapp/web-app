import { cache } from "@/lib/utils/cache";
import { cache as RCache } from "react";
import { playlistKeys } from "./playlistKeys";
import { createClient } from "@/lib/supabase/server-no-cookie";
import { createServerClient } from "@/lib/supabase/server";
import { Playlist } from "@recomendapp/types";

const PLAYLISTS_FEATURED_REVALIDATE_TIME = 60;

export const getPlaylistsFeatured = cache(
	async (
		filters: {
			page: number;
			perPage: number;
			sortBy: 'created_at' | 'updated_at';
			sortOrder: 'asc' | 'desc';
		}
	) => {
		const supabase = await createClient();
		let from = (filters.page - 1) * filters.perPage;
		let to = from + filters.perPage - 1;
		let request = supabase
			.from('playlists_featured')
			.select('*, playlist:playlists(*, user:profile(*))', { count: 'exact' })
			.range(from, to)

		if (filters) {
			if (filters.sortBy && filters.sortOrder) {
				switch (filters.sortBy) {
					case 'created_at':
						request = request.order('created_at', { referencedTable: 'playlist', ascending: filters.sortOrder === 'asc' });
						break;
					case 'updated_at':
						request = request.order('updated_at', { referencedTable: 'playlist', ascending: filters.sortOrder === 'asc' });
						break;
					default:
						throw new Error('Invalid sortBy');
				}
			}
		}
		return await request;
	},
	{
		revalidate: PLAYLISTS_FEATURED_REVALIDATE_TIME,
	},
	playlistKeys.featured(),
);

export const getPlaylist = RCache(async (id: number) => {
	const supabase = await createServerClient();
	const { data: playlist, error } = await supabase
		.from('playlists')
		.select('*, user:profile(*)')
		.eq('id', id)
		.maybeSingle()
		.overrideTypes<Playlist>();
	if (error) throw error;
	return playlist;
});