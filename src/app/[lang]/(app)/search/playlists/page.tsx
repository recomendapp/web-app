import { redirect } from '@/lib/i18n/routing';
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
    params: Promise<{
      lang: string;
    }>;
    searchParams?: Promise<{
      q: string;
    }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  if (!searchParams?.q) redirect({ href: '/search', locale: params.lang });
  return <SearchPlaylistsFull query={searchParams?.q} />;
}
