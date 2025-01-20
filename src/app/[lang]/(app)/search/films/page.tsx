import { redirect } from 'next/navigation';
import SearchFilmsFull from './_components/SearchFilmsFull';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
  };
}) {
  return {
    title: `${searchParams.q} - Films`,
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
  return <SearchFilmsFull query={searchParams?.q} />;
}
