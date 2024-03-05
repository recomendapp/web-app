'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// ICON
import { BiSearch } from 'react-icons/bi';
import useDebounce from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const [searchQuery, setSearchQuery] = useState<any>(q);
  const [isSearching, setIsSearching] = useState<any>(false);
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
    let queryString = '';
    if (searchQuery) {
      queryString += `q=${searchQuery}`;
    }
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    url && router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div
      ref={searchbarRef}
      className={cn('pointer-events-auto w-full h-full lg:w-fit', className)}
    >
      <form
        onSubmit={handleSubmit}
        className={` w-full h-full flex items-center rounded-full bg-secondary text-primary border border-solid border-transparent ${
          isSearching && 'border-white'
        }`}
      >
        {/* SEARCH BUTTON */}
        <button className="py-3 px-4">
          <BiSearch size={20} />
        </button>
        {/* SEARCH FORM */}
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
