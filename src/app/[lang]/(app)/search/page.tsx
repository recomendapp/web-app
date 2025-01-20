import FeaturedPlaylists from '@/components/Playlist/FeaturedPlaylists/FeaturedPlaylists';
import SearchFilmsSmall from './_components/SearchFilmsSmall';
import SearchBestResult from './_components/SearchBestResult';
import SearchCrewCastSmall from './_components/SearchCrewCastSmall';
import SearchPlaylistsSmall from './_components/SearchPlaylistsSmall';
import SearchUsersSmall from './_components/SearchUsersSmall';
import SearchSeriesSmall from './_components/SearchSeriesSmall';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: {
    q: string | undefined;
  };
}) {
  if (!searchParams?.q) {
    return {
      title: 'Rechercher',
    };
  }
  return {
    title: `${searchParams.q} - Recherche`,
  };
}

export default function Search({
  searchParams,
}: {
  searchParams?: {
    q: string | undefined;
  };
}) {
  if (searchParams?.q)
    return (
      <div className='grid grid-cols-2 gap-4'>
        <SearchBestResult query={searchParams.q} className='col-span-2 md:col-span-1' />
        <SearchFilmsSmall query={searchParams.q} className='col-span-2 md:col-span-1' />
        <SearchSeriesSmall query={searchParams.q} className='col-span-2' />
        <SearchPlaylistsSmall query={searchParams.q} className='col-span-2' />
        <SearchCrewCastSmall query={searchParams.q} className='col-span-2' />
        <SearchUsersSmall query={searchParams.q} className='col-span-2' />
      </div>
    );

  return <FeaturedPlaylists />;
}
