import { getMovieDetails } from '@/hooks/tmdb';
import MovieHeader from './assets/MovieHeader';
import MovieDescription from './assets/MovieDescription';
import MovieNavbar from './assets/MovieNavbar';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabase';

export async function generateMetadata({
  params,
}: {
  params: { film: string };
}) {
  // const { data: film } = await supabase.from('film').select('id').eq('slug', params.movie).single();
  // if (!film) {
  //   return {
  //     title: 'Oups, film introuvable !',
  //   };
  // }
  const film = await getMovieDetails(params.film, 'fr-FR');
  if (!film) {
    return {
      title: 'Oups, film introuvable !',
    };
  }
  return {
    title: film.title,
    description: `This is the page of ${film.title}`,
  };
}

export default async function Film({ params }: { params: { film: string } }) {
  // const { data: film } = await supabase.from('film').select('id').eq('slug', params.film).single();
  // if (!film) notFound();
  const film = await getMovieDetails(params.film, 'fr-FR');
  if (!film) notFound();

  return (
    <main>
      <MovieHeader movie={film} />
      <div className='px-4 pb-4'>
        <MovieNavbar focus={"description"} movieId={film.id} />
        <MovieDescription movie={film} />
      </div>
    </main>
  )
}
