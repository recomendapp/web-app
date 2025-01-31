import { unstable_cache as cache } from "next/cache";
import { playlistKeys } from "./playlistKeys";
import { createClient } from "@/lib/supabase/server-no-cookie";
const PLAYLISTS_FEATURED_REVALIDATE_TIME = 60 * 60;

export const getPlaylistsFeatured = async (
	props: {
		locale: string;
		filters: {
			page: number;
			perPage: number;
			sortBy: 'created_at' | 'updated_at';
			sortOrder: 'asc' | 'desc';
		}
	}
) => {
	return await cache(
		async () => {
			const supabase = await createClient(props.locale);
			let from = (props.filters.page - 1) * props.filters.perPage;
			let to = from + props.filters.perPage - 1;
			let request = supabase
				.from('playlists_featured')
				.select('*, playlist:playlists(*)', { count: 'exact' })
				.range(from, to)
			
			if (props.filters) {
				if (props.filters.sortBy && props.filters.sortOrder) {
					switch (props.filters.sortBy) {
						case 'created_at':
							request = request.order('created_at', { referencedTable: 'playlist', ascending: props.filters.sortOrder === 'asc', nullsFirst: false });
							break;
						case 'updated_at':
							request = request.order('updated_at', { referencedTable: 'playlist', ascending: props.filters.sortOrder === 'asc', nullsFirst: false });
							break;
						default:
							throw new Error('Invalid sortBy');
					}
				}
			}
			return await request;
		},
		playlistKeys.featured({ filters: props.filters }),
		{
			revalidate: PLAYLISTS_FEATURED_REVALIDATE_TIME,
		}
	)();
};