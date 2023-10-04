import { getMovieDetails } from '@/hooks/tmdb';
import MovieVerticalCard from '@/components/elements/Movie/MovieVerticalCard';
import MovieReviewForm from '@/components/modules/Review/form/MovieReviewForm';
import { notFound } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/supabase-server';

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
    const { data: review } = await supabaseServer.from('review').select('*, user!inner(*)').eq('user.username', params.username).single();
    console.log('reviewf', review)
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
    const { data: review } = await supabaseServer.from('review').select('*, user!inner(*)').eq('user.username', params.username).single();
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