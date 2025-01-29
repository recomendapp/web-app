import { redirect } from 'next/navigation';
import SearchSeriesFull from './_components/SearchSeriesFull';

export default async function SearchSeries(
  props: {
    searchParams?: Promise<{
      q: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  if (!searchParams?.q) redirect('/search');
  return <SearchSeriesFull query={searchParams?.q} />;
}
