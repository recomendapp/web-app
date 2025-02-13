'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import useDebounce from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from '@/lib/i18n/routing';

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  const [searchQuery, setSearchQuery] = useState(q ?? '');
  const [isSearching, setIsSearching] = useState(false);
  const searchbarRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(searchQuery);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearchQuery(event.target.elements.searchTerm.value);
  };

  const handleOnFocus = (event: any) => {
    setIsSearching(true);
  };
  const handleOutFocus = (event: any) => {
    setIsSearching(false);
  };

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    const params = new URLSearchParams(searchParams);
    params.set('q', searchQuery);
    if (!pathname.startsWith('/search')) {
      router.push(`/search?${params.toString()}`);
    } else {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearchTerm]);

  return (
    <div
      ref={searchbarRef}
      className={cn('pointer-events-auto w-full h-full lg:w-fit', className)}
    >
      <form
        onSubmit={handleSubmit}
        className={` w-full h-full flex items-center rounded-full bg-muted text-foreground border border-solid border-transparent ${
          isSearching && 'border-white'
        }`}
      >
        <button className="py-3 px-4">
          <BiSearch size={20} />
        </button>
        <input
          name="searchTerm"
          type="search"
          placeholder="Faire une recherche"
          className="w-full bg-transparent pr-4 focus:outline-none focus:outline-offset-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleOnFocus}
          onBlur={handleOutFocus}
          autoFocus
        />
      </form>
    </div>
  );
}
