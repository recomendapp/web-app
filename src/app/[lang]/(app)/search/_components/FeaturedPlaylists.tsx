import { z } from "zod";
import { CardPlaylist } from '@/components/Card/CardPlaylist';
import { getPlaylistsFeatured } from "@/features/server/playlist/playlistQueries";

const SORT_BY = ["created_at", "updated_at"] as const;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_SORT_BY = "updated_at";
const DEFAULT_SORT_ORDER = "desc";

const sortBySchema = z.enum(SORT_BY);
const getValidatedSortBy = (order?: string | null): z.infer<typeof sortBySchema> => {
  return sortBySchema.safeParse(order).success ? order! as z.infer<typeof sortBySchema> : DEFAULT_SORT_BY;
};
const orderSchema = z.enum(["asc", "desc"]);
const getValidatedSortOrder = (order?: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order! as z.infer<typeof orderSchema> : DEFAULT_SORT_ORDER;
};
const pageSchema = z.number().int().positive();
const getValidatePage = (page?: number | null): number => {
  return pageSchema.safeParse(page).success ? page! : DEFAULT_PAGE;
}
const perPageSchema = z.number().int().positive();
const getValidatePerPage = (perPage?: number | null): number => {
  return perPageSchema.safeParse(perPage).success ? perPage! : DEFAULT_PER_PAGE;
}

export default async function FeaturedPlaylists(
  props: {
    params: {
      lang: string;
    };
		searchParams?: {
      sort_by?: string;
      sort_order?: string;
      page?: number;
      per_page?: number;
    };
	}
) {
  const { params, searchParams } = props;
  const sortBy = getValidatedSortBy(searchParams?.sort_by);
  const sortOrder = getValidatedSortOrder(searchParams?.sort_order);
  const page = getValidatePage(Number(searchParams?.page));
  const perPage = getValidatePerPage(Number(searchParams?.per_page));

  const { data: playlists } = await getPlaylistsFeatured({
    locale: params.lang,
    filters: {
      page,
      perPage,
      sortBy,
      sortOrder,
    }
  });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {playlists?.map(({ playlist }, i) => (
          <CardPlaylist key={i} playlist={playlist}/>
      ))}
    </div>
  );
}
