import { redirect } from 'next/navigation';
import SearchFilmsFull from './_components/SearchFilmsFull';

export async function generateMetadata(
  props: {
    searchParams: Promise<{
      q: string | undefined;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  return {
    title: `${searchParams.q} - Films`,
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
  return <SearchFilmsFull query={searchParams?.q} />;
}
