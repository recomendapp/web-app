import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// CSS
// import styles from '../../../styles/searchbar/SearchBar.module.css'

// ICON
import { BiSearch } from 'react-icons/bi'
import useDebounce from '@/hooks/search/useDebounce';


export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const q = searchParams.get('q')
    const filter = searchParams.get('filter')

    const [ searchQuery, setSearchQuery ] = useState<any>(q);
    const [ isSearching, setIsSearching ] = useState<any>(false);
    const searchbarRef = useRef<HTMLDivElement>(null);

    const debouncedSearchTerm = useDebounce(searchQuery, 500)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setSearchQuery(event.target.elements.searchTerm.value)
    }

    const handleOnFocus = (event: any) => {
        setIsSearching(true);
    }
    const handleOutFocus = (event: any) => {
        setIsSearching(false);
    }

    useEffect(() => {
        let queryString = '';
        if (searchQuery) {
            queryString += `q=${searchQuery}`;
        }
        if (filter) {
            queryString += `${searchQuery ? '&' : ''}filter=${filter}`;
        }
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        url && router.push(url);
        
    }, [debouncedSearchTerm])


    return (
        <div ref={searchbarRef} className=' pointer-events-auto w-full h-full lg:w-fit'>
            <form onSubmit={handleSubmit} className={` w-full h-full flex items-center rounded-full bg-secondary text-primary border border-solid border-transparent ${isSearching && "border-white"}`}>
                {/* SEARCH BUTTON */}
                <button className="py-3 px-4">
                    <BiSearch size={20}/>
                </button>
                {/* SEARCH FORM */}
                <input 
                    name='searchTerm'
                    type="search"
                    placeholder='Faire une recherche'
                    className="w-full bg-transparent pr-4 focus:outline-none focus:outline-offset-2"
                    value={searchQuery}
                    // onChange={handleSearch}
                    
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleOnFocus}
                    onBlur={handleOutFocus}
                />
                
            </form>
        </div>
    );
}