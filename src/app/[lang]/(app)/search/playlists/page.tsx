import { redirect } from '@/lib/i18n/navigation';
import SearchPlaylistsFull from './_components/SearchPlaylistsFull';
import { Metadata } from 'next';
import { SupportedLocale } from '@/translations/locales';

export async function generateMetadata(
  props: {
    searchParams: Promise<{
      q: string | undefined;
    }>;
  }
): Promise<Metadata> {
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
  if (!searchParams?.q) redirect({ href: '/search', locale: params.lang as SupportedLocale });
  return <SearchPlaylistsFull query={searchParams?.q} />;
}
