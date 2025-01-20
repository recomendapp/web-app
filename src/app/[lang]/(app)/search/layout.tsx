"use client"

import SearchBar from '@/components/Search/SearchBar';
import { useUI } from '@/context/ui-context';
import SearchFilters from './_components/SearchFilters';

export default function Search({ children }: { children: React.ReactNode }) {
  const { device } = useUI();
  return (
    <main className="p-4">
      <div className={`
        flex flex-col gap-4 pb-4
        ${device !== "mobile" ? 'hidden' : ''}
      `}>
        <SearchBar />
      </div>
      <div className="@container flex flex-col gap-2">
        <SearchFilters />
        {children}
      </div>
    </main>
  );
}
