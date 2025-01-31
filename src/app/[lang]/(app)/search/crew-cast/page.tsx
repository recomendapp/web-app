import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getSearchPersons } from '@/features/server/search/searchQueries';
import { CardMedia } from '@/components/Card/CardMedia';
import { z } from "zod";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils';
import { generatePaginationNumbers } from '@/hooks/generate-pagination-numbers';
import { title } from '@/hooks/custom-lodash';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
    searchParams: Promise<{
      q?: string;
    }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: `${searchParams.q} - ${title(common('word.cast_and_crew'))}`,
  };
}

const DEFAULT_PAGE = 1;
const pageSchema = z.number().int().positive();
const getValidatePage = (page?: number | null): number => {
  return pageSchema.safeParse(page).success ? page! : DEFAULT_PAGE;
}

export default async function SearchCrewCast(
  props: {
    params: Promise<{
      lang: string;
    }>;
    searchParams: Promise<{
      q?: string;
      page?: string;
    }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  if (!searchParams?.q) redirect('/search');
  const page = getValidatePage(Number(searchParams.page));

  const { results, total_results } = await getSearchPersons({
    locale: params.lang,
    filters: {
      query: searchParams.q,
      page: page,
    }
  })

  if (!results || total_results === 0 || results.length === 0) {
    return (
      <div>
        No results found for <strong>{searchParams.q}</strong>
      </div>
    )
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <PaginationComponent searchParams={searchParams} total={total_results} page={page} />
      {results.map((film, i) => (
        <CardMedia
        key={i}
        variant='row'
        media={film}
        className='border-none bg-transparent'
        posterClassName='w-[50px]'
        />
      ))}
      <PaginationComponent searchParams={searchParams} total={total_results} page={page} />
    </div>
  );
}

const PaginationComponent = ({
  searchParams,
  total,
  page,
} : {
  searchParams: {
    q?: string;
    page?: string;
  };
  total: number;
  page: number;
}) => {
  const totalPages = Math.ceil(total / 20);
  const pageNumbers = generatePaginationNumbers(page, totalPages);

  const generatePageLink = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <Pagination className={cn('')}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={generatePageLink(page - 1)}
            disabled={page <= 1}
          />
        </PaginationItem>
        
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
            </PaginationItem>
        ) : (
            <PaginationItem key={pageNumber}>
            <PaginationLink
              href={generatePageLink(Number(pageNumber))}
              isActive={pageNumber === page}
            >
              {pageNumber}
            </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
          href={generatePageLink(page + 1)}
          disabled={page >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}