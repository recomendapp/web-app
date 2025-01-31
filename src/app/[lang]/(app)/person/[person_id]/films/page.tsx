import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getPerson, getPersonFilms } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';
import { z } from "zod";
import { Pagination } from './_components/Pagination';
import { Icons } from '@/config/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Filters } from './_components/Filters';

const SORT_BY = ["release_date", "vote_average"] as const;
const DISPLAY = ["grid", "row"] as const;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_DISPLAY = "grid";
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
	title: `Films avec ${person.title}`,
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
			per_page?: number;
			display?: string;
		}>;
	}
) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const sortBy = getValidatedSortBy(searchParams.sort_by);
	const sortOrder = getValidatedSortOrder(searchParams.sort_order);
	const page = getValidatePage(Number(searchParams.page));
	const perPage = getValidatePerPage(Number(searchParams.per_page));
	const display = getValidatedDisplay(searchParams.display);
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const { id } = getIdFromSlug(params.person_id);
	const { data: movies, error, count } = await getPersonFilms({
		id: id,
		locale: params.lang,
		filters: {
			sortBy: sortBy,
			sortOrder: sortOrder,
			page: page,
			perPage: perPage,
		}
	});

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center h-full gap-2'>
				<div className='flex items-center'>
					<Icons.error className='mr-1'/>
					{upperFirst(common('errors.wrong_arguments'))}
				</div>
				<Button variant='accent-1'>
					<Link href={`/person/${params.person_id}/films`}>
						Reset
					</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className='@container/person-films flex flex-col gap-4'>
			<div className='flex flex-col @md/person-films:flex-row @md/person-films:justify-between items-center gap-2'>
				<Filters
				sortBy={sortBy}
				sortOrder={sortOrder}
				display={display}
				/>
				<Pagination
				page={page}
				perPage={perPage}
				total={count ?? 0}
				searchParams={new URLSearchParams(searchParams as Record<string, string>)}
				className='@md/person-films:mx-0 @md/person-films:w-fit'
				/>
			</div>
			<div
			className={` gap-2
				${
					display == 'row'
					? 'flex flex-col'
					: 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 2xl:grid-cols-10'
				}
			`}
			>
				{movies.map((credits, index) => (
					<CardMedia
					key={index}
					variant={display === 'grid' ? 'poster' : 'row'}
					media={credits.media!}
					className='w-full'
					/>
				))}
			</div>
			<Pagination
			page={page}
			perPage={perPage}
			total={count ?? 0}
			searchParams={new URLSearchParams(searchParams as Record<string, string>)}
			/>
		</div>
	)
}