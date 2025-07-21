import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getPerson, getPersonFilms } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';
import { Pagination } from './_components/Pagination';
import { Icons } from '@/config/icons';
import { Link } from "@/lib/i18n/routing";
import { Button } from '@/components/ui/button';
import { Filters } from './_components/Filters';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { seoLocales } from '@/lib/i18n/routing';
import { notFound, redirect } from 'next/navigation';
import { ActiveFilters } from './_components/ActiveFilters';
import { getValidatedDisplay, getValidateDepartment, getValidatedSortBy, getValidatedSortOrder, getValidateJob, getValidatePage, getValidatePerPage } from './_components/constants';

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
  const person = await getPerson(params.lang, id);
  if (!person) return { title: upperFirst(common('errors.person_not_found')) };
  return {
	title: t('metadata.title', { name: person.title! }),
	description: truncate(t('metadata.description', { name: person.title! }), { length: siteConfig.seo.description.limit }),
	alternates: seoLocales(params.lang, `/person/${person.slug}/films`),
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
	const person = await getPerson(params.lang, id);
	if (!person) return notFound();
	const { data: movies, error, count } = await getPersonFilms(
		params.lang,
		id,
		{
			sortBy: sortBy,
			sortOrder: sortOrder,
			page: page,
			perPage: perPage,
			department: department,
			job: job,
		}
	);

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