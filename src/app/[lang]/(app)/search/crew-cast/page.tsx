import { redirect } from 'next/navigation';
import SearchCrewCastFull from './_components/SearchCrewCastFull';

export async function generateMetadata(
  props: {
    searchParams: Promise<{
      q: string | undefined;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  return {
    title: `${searchParams.q} - Crew & Cast`,
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
  return <SearchCrewCastFull query={searchParams?.q} />;
}
