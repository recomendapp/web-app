import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getPerson, getPersonFilms } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { z } from "zod";

const SORT_BY = ["release_date"] as const;
const DISPLAY = ["poster", "row"] as const;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_DISPLAY = "poster";
const DEFAULT_SORT_BY = "release_date";
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
const displaySchema = z.enum(DISPLAY);
const getValidatedDisplay = (display?: string | null): z.infer<typeof displaySchema> => {
  return displaySchema.safeParse(display).success ? display! as z.infer<typeof displaySchema> : DEFAULT_DISPLAY;
};
export async function generateMetadata(
  props: {
	params: Promise<{
	  lang: string;
	  person_id: string;
	}>;
  }
) {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const { id } = getIdFromSlug(params.person_id);
  const person = await getPerson({
	id: id,
	locale: params.lang,
  });
  if (!person) return { title: upperFirst(common('errors.person_not_found')) };
  return {
	title: `Série avec ${person.title}`,
	description: person.extra_data.biography,
  };
}

export default async function FilmsPage(
	props: {
		params: Promise<{
			lang: string;
			person_id: string;
		}>;
		searchParams: Promise<{
			sort_by?: string;
			sort_order?: string;
			page?: number;
			perPage?: number;
			display?: string;
		}>;
	}
) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const sortBy = getValidatedSortBy(searchParams.sort_by);
	const sortOrder = getValidatedSortOrder(searchParams.sort_order);
	const page = getValidatePage(Number(searchParams.page));
	const perPage = getValidatePerPage(Number(searchParams.perPage));
	const display = getValidatedDisplay(searchParams.display);
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const { id } = getIdFromSlug(params.person_id);

	return (
		<div className='@container/person-films flex flex-col gap-4'>
		
		</div>
	)
}