import { notFound } from 'next/navigation';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getPerson } from '@/features/server/media/mediaQueries';
import { Media } from '@/types/type.db';
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
  const person = await getPerson(params.lang, id);
  if (!person) notFound();
  return (
    <>
      <PersonHeader person={person} background={randomBackdrop(person.movies.map((movie) => movie.media))} />
      <div className="px-4 pb-4">
        <PersonNavbar personId={params.person_id} />
        {props.children}
      </div>
    </>
  );
}

const randomBackdrop = (object: Media[]) => {
  const itemsWithBackdrop = object.filter(
    (media ) => media?.backdrop_path
  );

  if (itemsWithBackdrop.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
  return `${TMDB_IMAGE_BASE_URL}/w1280${itemsWithBackdrop[randomIndex]?.backdrop_path}`;
};