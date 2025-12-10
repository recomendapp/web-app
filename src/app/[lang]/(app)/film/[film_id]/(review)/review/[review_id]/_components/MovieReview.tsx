'use client'

import { UserReviewMovie } from "@recomendapp/types";
import { useUserReviewMovieQuery } from "@/features/client/user/userQueries";
import ReviewViewer from "@/components/Review/ReviewViewer";
import { HeaderBox } from "@/components/Box/HeaderBox";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb/tmdb";
import { CardMovie } from "@/components/Card/CardMovie";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

export const MovieReview = ({
	reviewServer,
} : {
	reviewServer: UserReviewMovie;
}) => {
	const t = useTranslations();
	const {
		data: review
	} = useUserReviewMovieQuery({
		reviewId: reviewServer.id,
		initialData: reviewServer,
	});

	if (!review) return null;

	return (
	<>
		<HeaderBox className="flex-col items-center justify-center gap-4 pb-20" background={review.activity?.movie!.backdrop_path ? { src: `${TMDB_IMAGE_BASE_URL}/w1280${review.activity?.movie.backdrop_path}`, alt: review.activity?.movie.title ?? '', unoptimized: true } : undefined}>
				<h1 className="text-5xl font-bold text-primary text-center">
					{review.title || `${upperFirst(t('common.messages.review_by', { name: review.activity?.user?.full_name! }))}`}
				</h1>
				<CardMovie movie={review.activity?.movie!} className="h-12" />
		</HeaderBox>
		<div className='@container/review p-4 flex flex-col items-center -mt-20 z-1'>
			<ReviewViewer
			review={review}
			type='movie'
			movie={review.activity?.movie!}
			/>
		</div>
	</>
	);
}