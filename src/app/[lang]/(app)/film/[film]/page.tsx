import { getMovieDetails } from '@/lib/tmdb/tmdb';
import MovieHeader from './assets/MovieHeader';
import MovieDescription from './assets/MovieDescription';
import MovieNavbar from './assets/MovieNavbar';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
  const film = await getMovieDetails(Number(params.film), params.lang);
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

export default async function Film({
  params
}: {
  params: {
    lang: string;
    film: string;
  }
}) {
  const supabase = createServerClient();
  const { data: isExist } = await supabase.from('film').select('id').eq('id', params.film).single();
  const film = await getMovieDetails(Number(params.film), params.lang);
  if (!film) notFound();
  if (!isExist && film) {
      const { error } = await supabase.from('film').insert({ id: film.id });
      if (error) return notFound();
  }

  return (
    <main>
      {/*<RightSidebarServer panelTitle='Critiques' panelContent={<MovieReview filmId={film.id} />}/>*/}
      <MovieHeader movie={film} />
      <div className='px-4 pb-4'>
        <MovieNavbar focus={"description"} movieId={film.id} />
        <MovieDescription movie={film} />
      </div>
    </main>
  )
}
