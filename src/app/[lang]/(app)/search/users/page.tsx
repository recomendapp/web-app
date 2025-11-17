
import { redirect } from '@/lib/i18n/navigation';
import { Metadata } from 'next';
import SearchUsersFull from './_components/SearchUsersFull';
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
  if (!searchParams?.q) redirect({ href: '/search', locale: params.lang as SupportedLocale });
  return <SearchUsersFull query={searchParams?.q} />;
}
