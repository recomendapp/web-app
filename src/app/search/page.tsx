
import FeaturedPlaylists from '@/components/Playlist/FeaturedPlaylists/FeaturedPlaylists';
import SearchFilmsSmall from '@/components/Search/SearchFilms/SearchFilmsSmall';
import SearchPlaylistsSmall from '@/components/Search/SearchPlaylists/SearchPlaylistsSmall';
import { Fragment } from 'react';
import SearchUsersSmall from '@/components/Search/SearchUsers/SearchUsersSmall';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: {
    q: string | undefined,
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
    q: string | undefined,
  };
}) {
  if (searchParams?.q)
    return (
      <Fragment>
          <SearchFilmsSmall query={searchParams.q} />
          <SearchPlaylistsSmall query={searchParams.q} />
          <SearchUsersSmall query={searchParams.q} />
      </Fragment>
    )

  return <FeaturedPlaylists />
}
