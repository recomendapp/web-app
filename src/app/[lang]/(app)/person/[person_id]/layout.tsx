import { notFound } from 'next/navigation';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getPerson } from '@/features/server/media/mediaQueries';
import { MediaMovie, MediaPerson } from '@recomendapp/types';
import { TMDB_IMAGE_BASE_URL } from '@/lib/tmdb/tmdb';

export default async function PersonLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{
      lang: string;
      person_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id } = getIdFromSlug(params.person_id);
  let person: Awaited<ReturnType<typeof getPerson>>;
  try {
    person = await getPerson(params.lang, id);
  } catch {
    return notFound();
  }
  return (
    <>
      <PersonHeader person={person} background={randomBackdrop(person.movies.map((movie) => movie.movie))} />
      <div className="px-4 pb-4 flex flex-col items-center">
        <div className='max-w-7xl w-full'>
          <PersonNavbar personId={params.person_id} />
          {props.children}
        </div>
      </div>
    </>
  );
}

const randomBackdrop = (object: MediaMovie[]) => {
  const itemsWithBackdrop = object.filter(
    (movie ) => movie?.backdrop_path
  );

  if (itemsWithBackdrop.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
  return `${TMDB_IMAGE_BASE_URL}/w1280${itemsWithBackdrop[randomIndex]?.backdrop_path}`;
};