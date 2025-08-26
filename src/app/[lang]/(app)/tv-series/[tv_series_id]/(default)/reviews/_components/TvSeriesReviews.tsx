'use client';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaReviewsTvSeriesInfiniteQuery } from '@/features/client/media/mediaQueries';
import { Icons } from '@/config/icons';
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useUserActivityTvSeriesQuery } from '@/features/client/user/userQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, usePathname } from '@/lib/i18n/routing';
import { MediaTvSeries } from '@recomendapp/types';
import { CardReviewTvSeries } from '@/components/Card/CardReviewTvSeries';

const SORT_BY = ["updated_at"] as const;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_SORT_BY = SORT_BY[0];
const DEFAULT_SORT_ORDER = "desc";

const sortBySchema = z.enum(SORT_BY);
const getValidatedSortBy = (order?: string | null): z.infer<typeof sortBySchema> => {
  return sortBySchema.safeParse(order).success ? order! as z.infer<typeof sortBySchema> : DEFAULT_SORT_BY;
};
const orderSchema = z.enum(["asc", "desc"]);
const getValidatedSortOrder = (order?: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order! as z.infer<typeof orderSchema> : DEFAULT_SORT_ORDER;
};
const perPageSchema = z.number().int().positive();
const getValidatePerPage = (perPage?: number | null): number => {
  return perPageSchema.safeParse(perPage).success ? perPage! : DEFAULT_PER_PAGE;
}

interface TvSeriesReviewsProps {
	tvSeries: MediaTvSeries;
}

export const TvSeriesReviews = ({
	tvSeries,
} : TvSeriesReviewsProps) => {
	const t = useTranslations('common');
	const searchParams = useSearchParams();
	const sortBy = getValidatedSortBy(searchParams.get('sort_by'));
	const sortOrder = getValidatedSortOrder(searchParams.get('sort_order'));
	const perPage = getValidatePerPage(Number(searchParams.get('per_page')));
	const router = useRouter();
	const { ref, inView } = useInView();
	const {
		data: reviews,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useMediaReviewsTvSeriesInfiniteQuery({
		tvSeriesId: tvSeries.id,
		filters: {
			sortBy: sortBy,
			sortOrder: sortOrder,
			perPage: perPage,
		},
	});

	const handleChange = ({ name, value }: { name: string, value: string }) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		router.push(`?${params.toString()}`);
	};

	useEffect(() => {
		if (inView && hasNextPage) fetchNextPage();
	}, [inView, hasNextPage, fetchNextPage]);

	return (
	<div className="w-full h-full flex flex-col items-center gap-4">
		<div className="w-full flex flex-col gap-4 justify-between lg:flex-row">
		<MyReviewButton tvSeries={tvSeries} />
		<div className="flex justify-end gap-2 items-center">
			<Button
			variant={'ghost'}
			size={'sm'}
			onClick={(e) => {
				e.preventDefault();
				handleChange({ name: 'sort_order', value: sortOrder === 'desc' ? 'asc' : 'desc' });
			}}>
			{sortOrder === 'desc' ? <ArrowDownNarrowWideIcon size={20} /> : <ArrowUpNarrowWideIcon size={20} />}
			</Button>
			<Select defaultValue={sortBy} onValueChange={(e) => handleChange({ name: 'sort_by', value: e })}>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{SORT_BY.map((sort) => (
				<SelectItem key={sort} value={sort}>{upperFirst(t(`messages.${sort}`))}</SelectItem>
				))}
			</SelectContent>
			</Select>
		</div>
		</div>
		<div className='flex flex-col gap-2 w-full max-w-xl'>
		{/* ALL */}
		{(isLoading || reviews === undefined) ? (
			<Icons.loader />
		) : reviews?.pages[0]?.length ? (
			reviews?.pages.map((page, i) => (
				page?.map((review, index) => {
				if (!review) return null;
				return (
					<CardReviewTvSeries
					ref={(i === reviews.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
					key={review?.id ?? index}
					review={review}
					activity={review?.activity}
					author={review?.activity?.user}
					url={`/tv-series/${tvSeries.slug}/review/${review?.id}`}
					/>
				)
				})
			))
		) : (
			<p className="text-muted-foreground text-center font-semibold">{upperFirst(t('messages.no_reviews'))}</p>
		)}
		{isFetchingNextPage ? <Icons.loader /> : null}
		</div>
	</div>
	);
};

const MyReviewButton = ({
	tvSeries,
 } : {
	tvSeries: MediaTvSeries;
}) => {
	const pathname = usePathname();
	const common = useTranslations('common');
	const { session } = useAuth();
	const {
	  data: activity,
	  isLoading,  
	} = useUserActivityTvSeriesQuery({
		tvSeriesId: tvSeries.id,
		userId: session?.user.id,
	});

	if (!session) return;

	if (isLoading || activity === undefined) return <Skeleton className="w-36 h-10 rounded-full"/>;
  
	if (!activity?.review) {
		return (
			<Link
			href={`/tv-series/${tvSeries.slug}/review/create`}
			className="bg-accent-blue rounded-full px-4 py-1 flex gap-2 items-center"
			>
				<Icons.edit />
				{upperFirst(common('messages.write_review'))}
			</Link>
		);
	}
  
	return (
		<Link
		href={`${tvSeries.url}/review/${activity?.review?.id}`}
		className="bg-accent-blue rounded-full px-4 py-1 flex gap-2 items-center"
		>
			<Icons.edit />
			{upperFirst(common('messages.my_review', { count: 1 }))}
		</Link>
	);
};