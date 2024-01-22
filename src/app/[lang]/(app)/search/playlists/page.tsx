import SearchPlaylistsFull from '@/components/Search/SearchPlaylists/SearchPlaylistsFull';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
  };
}) {
  return {
    title: `${searchParams.q} - Playlists`,
  };
}

export default function SearchFilms({
  searchParams,
}: {
  searchParams?: {
    q: string;
  };
}) {
  if (!searchParams?.q) redirect('/search');
  return <SearchPlaylistsFull query={searchParams?.q} />;
}
