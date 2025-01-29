import { redirect } from 'next/navigation';
import SearchUsersFull from '@/components/Search/SearchUsers/SearchUsersFull';

export async function generateMetadata(
  props: {
    searchParams: Promise<{
      q: string | undefined;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  return {
    title: `${searchParams.q} - Utilisateurs`,
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
  return <SearchUsersFull query={searchParams?.q} />;
}
