import { getMovieDetails } from '@/lib/tmdb';
import MovieVerticalCard from '@/components/Film/MovieVerticalCard';
import MovieReviewForm from '@/components/Review/form/MovieReviewForm';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/supabase-server';

export async function generateMetadata({
    params,
}: {
    params: { film: string, username: string };
}) {
    const film = await getMovieDetails(params.film, 'fr-FR');
    if (!film) {
        return {
        title: 'Oups, film introuvable !',
        };
    }
    const supabaseServer = createServerClient()

    const { data: review } = await supabaseServer.from('review').select('*, user!inner(*)').eq('user.username', params.username).single();

    if (!review) {
        return {
            title: 'Oups, critique introuvable !',
        };
    }
    return {
    title: `${review.title}`,
    description: `Critique de ${film.title} écrite par ${review.user.username} le ${review.user.username}.`,
    };
}

export default async function Review({ params }: { params: { film: string, username: string } }) {
    const film = await getMovieDetails(params.film, 'fr-FR');

    const supabaseServer = createServerClient()

    const { data: review } = await supabaseServer.from('review').select('*, user!inner(*)').eq('user.username', params.username).eq('film_id', params.film).single();
    if (!review) notFound();

    return (
        <main className='flex flex-col lg:grid lg:grid-cols-6 p-4 gap-4'>
            <MovieVerticalCard movie={film} />
            <div className='col-span-5'>
              <MovieReviewForm review={review} />
            </div>
        </main>
    )
}