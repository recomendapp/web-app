'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// ICON
import { BiSearch } from 'react-icons/bi';
import useDebounce from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

// Elasticsearch
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchBox, SearchProvider } from "@elastic/react-search-ui";
import { useLocale } from 'next-intl';

const renderInput = ({
  getAutocomplete,
  getInputProps,
  getButtonProps
} : {
  getAutocomplete: any,
  getInputProps: any,
  getButtonProps: any
}) => {
  return (
      <div className="search-box w-full h-full flex items-center rounded-full bg-muted text-foreground border border-solid border-transparent">
          <div className="py-3 px-4">
            <BiSearch size={20}/>
          </div>
          {/* <EuiIcon className="search-box__icon" type="search" /> */}
          <input
              {...getInputProps({
                  className: "search-box__input w-full bg-transparent pr-4 focus:outline-none focus:outline-offset-2",
                  placeholder: "Faire une recherche"
              })}
          />
          {getAutocomplete()}
      </div>
  )
}

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SearchBar({ className }: SearchBarProps) {
  const locale = useLocale();
  const router = useRouter();

  const connector = new AppSearchAPIConnector({
    searchKey: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
    engineName: `search-${locale}`,
    endpointBase: process.env.NEXT_PUBLIC_SEARCH_BASE_URL || "",
    cacheResponses: false
  });

  const configurationOptions = {
    apiConnector: connector,
    trackUrlState: false,
    alwaysSearchOnInitialLoad: false,
    autocompleteQuery: {
      results: {
        result_fields: {
          title: {
            snippet: {
              size: 100
            }
          }
        }
      }, 
      suggestions: {
        types: {
          // Limit query to only suggest based on "title" field
          documents: { fields: ["title"] }
        },
        // Limit the number of suggestions returned from the server
        size: 3
      }
    }
  };

  return (
    <SearchProvider config={configurationOptions}>
      <SearchBox
          searchAsYouType={true}
          inputView={renderInput}
          autocompleteSuggestions={{
              sectionTitle: "Suggested Queries"
          }}
          autocompleteMinimumCharacters={2}
          onSubmit={searchTerm => {
              router.push("/search?q=" + searchTerm);
          }}
          onSelectAutocomplete={(selection: any, defaultOnSelectAutocomplete: any) => {
              if (selection.suggestion) {
                  router.push("/search?q=" + selection.suggestion);
              } else {
                  defaultOnSelectAutocomplete(selection);
              }
          }}
      />
    </SearchProvider>
  )
}
