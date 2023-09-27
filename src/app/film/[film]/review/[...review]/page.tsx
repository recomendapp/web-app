import { getReview } from '@/api/movie/movie_review';
import { getMovieDetails } from '@/hooks/tmdb';
import MovieVerticalCard from '@/components/elements/Movie/MovieVerticalCard';
import MovieReviewForm from '@/components/modules/MovieReview/form/MovieReviewForm';
import { notFound } from 'next/navigation';

export async function generateMetadata({
    params,
}: {
    params: { movie: string, review: string };
}) {
    const movie = await getMovieDetails(params.movie, 'fr-FR');
    if (!movie) {
        return {
        title: 'Oups, film introuvable !',
        };
    }
    const review = await getReview(params.review);
    if (!review) {
    return {
        title: 'Oups, critique introuvable !',
    };
    }
    return {
    title: `${review.title}`,
    description: `Critique de ${movie.title} écrite par ${review.user.username} le ${review.user.username}. ${review.body}`,
    };
}

export default async function Review({ params }: { params: { movie: string, review: string } }) {
    const movie = await getMovieDetails(params.movie, 'fr-FR');
    const review = await getReview(params.review);

    if (!review) notFound();

    return (
        <main className='flex flex-col lg:grid lg:grid-cols-6 p-4 gap-4'>
            <MovieVerticalCard movie={movie} />
            <div className='col-span-5'>
              <MovieReviewForm review={review} />
            </div>
        </main>
    )
}