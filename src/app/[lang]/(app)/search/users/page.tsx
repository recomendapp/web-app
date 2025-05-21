import SearchUsersFull from '@/components/Search/SearchUsers/SearchUsersFull';
import { redirect } from '@/lib/i18n/routing';
import { Metadata } from 'next';

export async function generateMetadata(
  props: {
    searchParams: Promise<{
      q: string | undefined;
    }>;
  }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title: `${searchParams.q} - Utilisateurs`,
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
  return <SearchUsersFull query={searchParams?.q} />;
}
