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
        .select(`*, user!inner(*), review(*, user(*))`)
        .eq('film_id', params.film)
        .eq('user.username', params.username)
        .single()

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4">
            <div className="bg-muted h-fit p-4 rounded-md">
                <MovieCard filmId={film.id} />
            </div>
            <div className="w-full bg-muted h-fit p-4 rounded-md">
                {activity?.review && <MovieReviewForm review={activity.review} />}
            </div>
            {/* <main className='flex flex-col gap-4 @5xl:flex-row @5xl:justify-between'>
                <div className='flex flex-row gap-4 @5xl:max-w-xl @5xl:flex-col'>
                    <MovieVerticalCard movie={film} />
                    <MovieAction all filmId={params.film} />
                </div>
                <div className='bg-red-500 w-full'>
                    <UserCard user={data?.user} />
                </div>
            </main> */}
            {/* <MovieVerticalCard movie={film} /> */}
        </div>
        // <main className='flex flex-col lg:grid lg:grid-cols-6 p-4 gap-4'>
        //     <MovieVerticalCard movie={film} />
        //     <div className='col-span-5'>
        //       <MovieReviewForm review={review} />
        //     </div>
        // </main>
    )
}