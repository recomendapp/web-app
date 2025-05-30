import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getPerson, getPersonFilms } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';
import { z } from "zod";
import { Pagination } from './_components/Pagination';
import { Icons } from '@/config/icons';
import { Link } from "@/lib/i18n/routing";
import { Button } from '@/components/ui/button';
import { Filters } from './_components/Filters';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { locales } from '@/lib/i18n/locales';
import { notFound, redirect } from 'next/navigation';
import { ActiveFilters } from './_components/ActiveFilters';

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

const departmentSchema = z.string().optional();
const getValidateDepartment = (department?: string | null): string | undefined => {
  if (department === null) return undefined;
  return departmentSchema.safeParse(department).success ? department : undefined;
};
const jobSchema = z.string().optional();
const getValidateJob = (job?: string | null): string | undefined => {
  if (job === null) return undefined;
  return jobSchema.safeParse(job).success ? job : undefined;
};
export async function generateMetadata(
  props: {
	params: Promise<{
	  lang: string;
	  person_id: string;
	}>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.person.films' });
  const { id } = getIdFromSlug(params.person_id);
  const person = await getPerson({
	id: id,
	locale: params.lang,
  });
  if (!person) return { title: upperFirst(common('errors.person_not_found')) };
  return {
	title: t('metadata.title', { name: person.title! }),
	description: truncate(t('metadata.description', { name: person.title! }), { length: siteConfig.seo.description.limit }),
	alternates: {
		canonical: `${siteConfig.url}/person/${person.slug}/films`,
		languages: Object.fromEntries([
			['x-default', `${siteConfig.url}/person/${person.slug}/films`],
			...locales.map((locale) => [locale, `${siteConfig.url}/${locale}/person/${person.slug}/films`])
		])
	},
	openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { name: person.title! })} • ${siteConfig.name}`,
      description: truncate(t('metadata.description', { name: person.title! }), { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/${params.lang}/person/${person.slug}/films`,
      images: person.avatar_url ? [
        { url: person.avatar_url },
      ] : undefined,
      type: 'profile',
      locale: params.lang,
    }
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
			department?: string;
			job?: string;
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
	const department = getValidateDepartment(searchParams.department);
	const job = getValidateJob(searchParams.job);
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	const { id } = getIdFromSlug(params.person_id);
	const person = await getPerson({
		id: id,
		locale: params.lang,
  	});
	if (!person) return notFound();
	const { data: movies, error, count } = await getPersonFilms({
		id: id,
		locale: params.lang,
		filters: {
			sortBy: sortBy,
			sortOrder: sortOrder,
			page: page,
			perPage: perPage,
			department: department,
			job: job,
		}
	});

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center h-full gap-2'>
				<div className='flex items-center'>
					<Icons.error className='mr-1'/>
					{upperFirst(common('errors.wrong_arguments'))}
				</div>
				<Button variant='accent-yellow'>
					<Link href={`/person/${params.person_id}/films`}>
						Reset
					</Link>
				</Button>
			</div>
		)
	}

	if (!movies.length) {
		if (department || job) {
			return redirect(`/person/${params.person_id}/films`);
		}
	}

	return (
		<div className='@container/person-films flex flex-col gap-4'>
			<div>
				<div className='flex flex-col @md/person-films:flex-row @md/person-films:justify-between items-center gap-2'>
					<Filters
					knownForDepartment={person.extra_data.known_for_department}
					jobs={person.jobs}
					sortBy={sortBy}
					sortOrder={sortOrder}
					display={display}
					department={department}
					job={job}
					/>
					<Pagination
					page={page}
					perPage={perPage}
					total={count ?? 0}
					searchParams={new URLSearchParams(searchParams as Record<string, string>)}
					className='@md/person-films:mx-0 @md/person-films:w-fit'
					/>
				</div>
				<ActiveFilters
				department={department}
				job={job}
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