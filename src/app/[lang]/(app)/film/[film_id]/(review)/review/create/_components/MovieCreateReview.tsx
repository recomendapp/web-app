'use client';

import { Button } from '@/components/ui/button';
import { JSONContent, MediaMovie, MediaPerson } from '@/types/type.db';
import { useAuth } from '@/context/auth-context';
import { Link, useRouter } from "@/lib/i18n/routing";
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { useUserActivityMovieQuery } from '@/features/client/user/userQueries';
import ReviewForm from '@/components/Review/ReviewForm';
import { useUserReviewMovieUpsertMutation } from '@/features/client/user/userMutations';
import ButtonUserActivityMovieRating from '@/components/buttons/ButtonUserActivityMovieRating';

export const MovieCreateReview = ({
	movie,
	slug,
}: {
	movie: MediaMovie;
	slug: string;
}) => {
	const { session } = useAuth();
	const router = useRouter();

	const {
		data: activity,
	} = useUserActivityMovieQuery({
		movieId: movie.id,
		userId: session?.user.id,
	});
	const upsertReview = useUserReviewMovieUpsertMutation({
		userId: session?.user.id,
		movieId: movie.id,
	});

	const handleSubmit = async (data: { title?: string; body: JSONContent }) => {
		await upsertReview.mutateAsync({
			activityId: activity?.id,
			...data
		}, {
			onSuccess: (review) => {
				router.replace(`/film/${slug}/review/${review.id}`);
			},
			onError: (error) => {
				throw error;
			}
		});
	};

	return (
	<div className="@container/review">
		<div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
			{/* MEDIA */}
			<Link className='shrink-0' href={movie.url ?? ''}>
			<Card
			className={`
				flex items-center rounded-xl bg-muted hover:bg-muted-hover p-1 h-20
				@3xl/review:flex-col @3xl/review:items-start @3xl/review:h-fit
			`}
			>
				<div
				className={'relative h-full shrink-0 rounded-md overflow-hidden @3xl/review:w-56 aspect-[2/3]'}
				>
				<ImageWithFallback
				src={movie.avatar_url ?? ''}
				alt={movie.title ?? ''}
				fill
				className="object-cover"
				type="movie"
				sizes={`
				(max-width: 640px) 96px,
				(max-width: 1024px) 120px,
				150px
				`}
				/>
				</div>
				<div className='px-2 py-1 space-y-1'>
				<h3 className='text-xl font-semibold line-clamp-2 break-words'>{movie?.title}</h3>
				{movie.main_credit ? <Credits credits={movie.main_credit ?? []} /> : null}
				</div>
			</Card>
			</Link>
			<ReviewForm
			rating={activity?.rating || undefined}
			mediaAction={<ButtonUserActivityMovieRating movieId={movie.id} />}
			onCreate={handleSubmit}
			/>
		</div>
	</div>
  );
}

const Credits = ({
  credits,
  className,
}: {
  credits: MediaPerson[];
  className?: string;
}) => {
  if (!credits || credits.length === 0) return null;
  return (
    <p className={cn('line-clamp-2', className)}>
      {credits?.map((credit, index: number) => (
        <span key={index}>
          <Button
            variant={'link'}
            className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-yellow transition"
            asChild
          >
            <Link href={credit.url ?? ''}>
              {credit.title}
            </Link>
          </Button>
          {index !== credits.length - 1 && (
            <span className='text-muted-foreground'>, </span>
          )}
        </span>
      ))}
    </p>
  )
};
