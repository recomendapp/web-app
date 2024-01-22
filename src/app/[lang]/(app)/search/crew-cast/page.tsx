import SearchCrewCastFull from '@/components/Search/SearchCrewCast/SearchCrewCastFull';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
  };
}) {
  return {
    title: `${searchParams.q} - Crew & Cast`,
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
  return <SearchCrewCastFull query={searchParams?.q} />;
}
