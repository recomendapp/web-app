import { redirect } from 'next/navigation';
import SearchSeriesFull from './_components/SearchSeriesFull';

export default function SearchSeries({
  searchParams,
}: {
  searchParams?: {
    q: string;
  };
}) {
  if (!searchParams?.q) redirect('/search');
  return <SearchSeriesFull query={searchParams?.q} />;
}
