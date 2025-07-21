import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getSearchTvSeries } from '@/features/server/search/searchQueries';
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
import { redirect } from '@/lib/i18n/routing';
import { Metadata } from 'next';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
    searchParams: Promise<{
      q?: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: `${searchParams.q} - ${upperFirst(common('messages.tv_series', { count: 2 }))}`,
  };
}

const DEFAULT_PAGE = 1;
const pageSchema = z.number().int().positive();
const getValidatePage = (page?: number | null): number => {
  return pageSchema.safeParse(page).success ? page! : DEFAULT_PAGE;
}

export default async function SearchTvSeries(
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
  if (!searchParams?.q) redirect({ href: '/search', locale: params.lang });
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const page = getValidatePage(Number(searchParams.page));

  const { results, total_results } = await getSearchTvSeries(
    params.lang,
    {
      query: searchParams.q ?? '',
      page: page,
    }
  );

  if (!results || total_results === 0 || results.length === 0) {
    return (
      <p className='text-muted-foreground'>
        {common.rich('messages.no_results_for', {
          query: searchParams.q,
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>
    )
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <PaginationComponent searchParams={searchParams} total={total_results} page={page} />
      {results.map((serie, i) => (
        <CardMedia
        key={i}
        variant='row'
        media={serie}
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