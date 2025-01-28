import FeaturedPlaylists from '@/components/Playlist/FeaturedPlaylists/FeaturedPlaylists';
import SearchFilmsSmall from './_components/SearchFilmsSmall';
import SearchBestResult from './_components/SearchBestResult';
import SearchCrewCastSmall from './_components/SearchCrewCastSmall';
import SearchPlaylistsSmall from './_components/SearchPlaylistsSmall';
import SearchUsersSmall from './_components/SearchUsersSmall';
import SearchTvSeriesSmall from './_components/SearchTvSeriesSmall';

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
    searchParams?: Promise<{
      q: string | undefined;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  if (searchParams?.q)
    return (
      <div className='grid grid-cols-1 @xl/search:grid-cols-3 gap-4'>
        <SearchBestResult query={searchParams.q} className='@xl/search:col-span-1' />
        <SearchFilmsSmall query={searchParams.q} className='@xl/search:col-span-2' />
        <SearchTvSeriesSmall query={searchParams.q} className='@xl/search:col-span-3' />
        <SearchPlaylistsSmall query={searchParams.q} className='@xl/search:col-span-3' />
        <SearchCrewCastSmall query={searchParams.q} className='@xl/search:col-span-3' />
        <SearchUsersSmall query={searchParams.q} className='@xl/search:col-span-3' />
      </div>
    );
  return <FeaturedPlaylists />;
}
