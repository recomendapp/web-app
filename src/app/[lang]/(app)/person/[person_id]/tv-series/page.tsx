import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getPerson, getPersonTvSeries } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { seoLocales } from '@/lib/i18n/routing';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Icons } from '@/config/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getValidatedDisplay, getValidateDepartment, getValidatedSortBy, getValidatedSortOrder, getValidateJob, getValidatePage, getValidatePerPage } from './_components/constants';
import { CardTvSeries } from '@/components/Card/CardTvSeries';
import { SupportedLocale } from '@/translations/locales';
import { Filters } from './_components/Filters';
import { Pagination } from './_components/Pagination';
import { ActiveFilters } from './_components/ActiveFilters';

export async function generateMetadata(
  props: {
	params: Promise<{
	  lang: string;
	  person_id: string;
	}>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { id } = getIdFromSlug(params.person_id);
  try {
	  const person = await getPerson(params.lang, id);
	  return {
		title: t('pages.person.tv_series.metadata.title', { name: person.name! }),
		description: truncate(t('pages.person.tv_series.metadata.description', { name: person.name! }), { length: siteConfig.seo.description.limit }),
		alternates: seoLocales(params.lang, `/person/${person.slug}/tv-series`),
		openGraph: {
		  siteName: siteConfig.name,
		  title: `${t('pages.person.tv_series.metadata.title', { name: person.name! })} • ${siteConfig.name}`,
		  description: truncate(t('pages.person.tv_series.metadata.description', { name: person.name! }), { length: siteConfig.seo.description.limit }),
		  url: `${siteConfig.url}/${params.lang}/person/${person.slug}/tv-series`,
		  images: person.profile_url ? [
			{ url: person.profile_url },
		  ] : undefined,
		  type: 'profile',
		  locale: params.lang,
		}
	  };
  } catch {
	return { title: upperFirst(t('common.messages.person_not_found')) };
  }
}

export default async function TvSeriesPage(
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
	const t = await getTranslations({ locale: params.lang as SupportedLocale });
	const { id } = getIdFromSlug(params.person_id);
	let person: Awaited<ReturnType<typeof getPerson>>;
	try {
		person = await getPerson(params.lang, id);
	} catch {
		return notFound();
	}
	const { data: series, error, count } = await getPersonTvSeries(
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
					{upperFirst(t('common.messages.wrong_arguments'))}
				</div>
				<Button asChild>
					<Link href={`/person/${params.person_id}/tv-series`}>
						Reset
					</Link>
				</Button>
			</div>
		)
	}

	if (!series.length) {
		if (department || job) {
			return redirect(`/person/${params.person_id}/tv-series`);
		}
	}

	return (
	<div className='flex flex-col items-center'>
		<div className='@container/person-films flex flex-col gap-4 max-w-7xl w-full'>
			<div className='space-y-2'>
				<div className='flex flex-col @3xl/person-films:flex-row @3xl/person-films:justify-between items-center gap-2'>
					<Filters
					knownForDepartment={person.known_for_department!}
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
					className='@md/person-tv-series:mx-0 @md/person-tv-series:w-fit'
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
				{series.map((credits, index) => (
					<CardTvSeries
					key={index}
					variant={display === 'grid' ? 'poster' : 'row'}
					tvSeries={credits.tv_series!}
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
	</div>
	)
}