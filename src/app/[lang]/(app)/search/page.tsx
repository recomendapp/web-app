import SearchFilmsSmall from './_components/SearchFilmsSmall';
import SearchBestResult from './_components/SearchBestResult';
import SearchCrewCastSmall from './_components/SearchCrewCastSmall';
import SearchPlaylistsSmall from './_components/SearchPlaylistsSmall';
import SearchUsersSmall from './_components/SearchUsersSmall';
import SearchTvSeriesSmall from './_components/SearchTvSeriesSmall';
import FeaturedPlaylists from './_components/FeaturedPlaylists';
import { getSearchMulti } from '@/features/server/search/searchQueries';
import { SupportedLocale } from '@/translations/locales';

export async function generateMetadata(
  props: {
    searchParams?: Promise<{
      q: string | undefined;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  if (!searchParams?.q) {
    return {
      title: 'Rechercher',
    };
  }
  return {
    title: `${searchParams.q} - Recherche`,
  };
}

export default async function Search(
  props: {
    params: Promise<{
      lang: string;
    }>;
    searchParams?: Promise<{
      q: string | undefined;
      sort_by?: string;
      sort_order?: string;
      page?: number;
    }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  if (searchParams?.q) {
    const results = await getSearchMulti(
      params.lang,
      {
        query: searchParams.q,
        page: 1,
      }
    );
    if (
      (!results || results.total_results === 0 || results.total_results === 0)
    ) {
      return (
        <div>
          No results found for <strong>{searchParams.q}</strong>
        </div>
      )
    }
    return (
      <div className='grid grid-cols-1 @xl/search:grid-cols-3 gap-4'>
        <SearchBestResult result={results.best_result} className='@xl/search:col-span-1' />
        <SearchFilmsSmall movies={results.movies} query={searchParams.q} locale={params.lang as SupportedLocale} className='@xl/search:col-span-2' />
        <SearchTvSeriesSmall  tvSeries={results.tv_series} query={searchParams.q} locale={params.lang as SupportedLocale} className='@xl/search:col-span-3' />
        <SearchPlaylistsSmall query={searchParams.q} className='@xl/search:col-span-3' />
        <SearchCrewCastSmall persons={results.persons} query={searchParams.q} locale={params.lang as SupportedLocale} className='@xl/search:col-span-3' />
        <SearchUsersSmall query={searchParams.q} className='@xl/search:col-span-3' />
      </div>
    );
  }
  const { q, ...searchParamsWithoutQ } = searchParams ?? {};
  return <FeaturedPlaylists params={params} searchParams={searchParamsWithoutQ} />;
}
