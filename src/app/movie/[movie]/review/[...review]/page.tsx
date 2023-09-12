import { getReview } from '@/api/movie/movie_review';
import { getMovieDetails } from '@/hooks/tmdb';
import MovieVerticalCard from '@/components/movie/MovieVerticalCard';
import MovieReviewForm from '@/components/movie/review/form/MovieReviewForm';

export async function generateMetadata({
    params,
}: {
    params: { movie: string, review: string };
}) {
    const movie = await getMovieDetails(params.movie, 'fr-FR');
    if (movie.success === false) {
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

    if (!review) {
        return <NotFound />;
    }

    return (
        <main className='flex flex-col lg:grid lg:grid-cols-6 p-4 gap-4'>
            <MovieVerticalCard movie={movie} />
            <div className='col-span-5'>
              <MovieReviewForm review={review} />
            </div>
        </main>
    )
}

export function NotFound() {
    return (
      <main 
        className="bg-white w-full h-full flex justify-center items-center"
        style={{
          backgroundImage: `url('https://s.ltrbxd.com/static/img/errors/not-found-2.f67937bb.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='text-4xl font-bold'>
          Oups, cette critique n'existe pas !
        </div>
      </main>
    )
  }