import { redirect } from 'next/navigation';
import SearchPlaylistsFull from './_components/SearchPlaylistsFull';

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
