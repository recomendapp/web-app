import SearchPlaylistsFull from '@/components/Search/SearchPlaylists/SearchPlaylistsFull';
import { redirect } from 'next/navigation';

export async function generateMetadata(
  props: {
    searchParams: Promise<{
      q: string | undefined;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  return {
    title: `${searchParams.q} - Playlists`,
  };
}

export default async function SearchFilms(
  props: {
    searchParams?: Promise<{
      q: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  if (!searchParams?.q) redirect('/search');
  return <SearchPlaylistsFull query={searchParams?.q} />;
}
