import SearchFilters from '@/components/Search/SearchFilters';
import SearchBar from '@/components/Search/SearchBar';

export default function Search({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4">
      <div className="flex flex-col gap-4 pb-4 lg:hidden">
        <div className="text-4xl font-bold">Recherche</div>
        <SearchBar />
      </div>
      <div className="@container flex flex-col gap-2">
        <SearchFilters />
        {children}
      </div>
    </main>
  );
}
