import { getMovieDetails } from '@/lib/tmdb/tmdb';
import MovieVerticalCard from '@/components/Film/MovieVerticalCard';
import MovieReviewForm from '@/components/Review/form/MovieReviewForm';
import { notFound } from 'next/navigation';
import MoviePoster from '@/components/Film/MoviePoster';
import UserCard from '@/components/User/UserCard/UserCard';
import { MovieAction } from '@/components/Film/FilmAction/MovieAction';
import { createServerClient } from '@/lib/supabase/server';
import MovieCard from '@/components/Film/Card/MovieCard';

export default async function Review({
    params
}: {
    params: {
        lang: string,
        username: string
        film: number,
    }
}) {
    const supabase = createServerClient();
    
    const film = await getMovieDetails(params.film, params.lang);
    
    const { data: activity } = await supabase
        .from('user_movie_activity')
        .select(`*, user!inner(*), review:user_movie_review(*, user(*))`)
        .eq('film_id', params.film)
        .eq('user.username', params.username)
        .single()

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4">
            <div className="bg-muted h-fit w-[500px] p-4 rounded-md">
                <MovieCard filmId={film.id} />
            </div>
            <div className="w-full bg-muted h-fit p-4 rounded-md">
                {activity?.review && <MovieReviewForm review={activity.review} />}
            </div>
        </div>
    )
}