import { getPersonDetails } from '@/lib/tmdb/tmdb';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import PersonFilmography from './_components/PersonFilmography';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const person = await getPersonDetails(params.person, params.lang);
  if (!person) {
    return {
      title: 'Oups, personne introuvable !',
    };
  }
  return {
    title: person.name,
    description: `This is the page of ${person.name}`,
  };
}

export default async function Film({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const supabase = createServerClient();
  // const person = await getPersonDetails(params.person, params.lang);

  const { data: person } = await supabase
		.from('tmdb_person')
		.select(`
			*,
			data:tmdb_person_translation(*)
		`)
		.eq('id', params.person)
		.eq('data.language', params.lang)
		.single();

  if (!person) notFound();

  let queryBackground = supabase
    .from('tmdb_movie_credits_random')
    .select(`
      *,
      movie(*)
    `)
    .eq('person_id', params.person)
    .eq('movie.language', params.lang);
  
  if (person.known_for_department) {
    queryBackground = queryBackground.eq('department', person.known_for_department)
  }

  const { data: backgrounds } = await queryBackground.limit(1)

  const { data: departments } = await supabase
    .from('tmdb_person_department')
    .select('department')
    .eq('person_id', params.person);

  return (
    <main>
      <PersonHeader person={person} background={backgrounds![0].movie?.backdrop_path ?? ''} />
      <div className="px-4 pb-4">
        {/* <PersonNavbar focus={"oeuvre"} personId={person.id} /> */}
        <PersonFilmography
          person={person}
          departments={departments}
          mainDepartment={person.known_for_department ?? undefined}
        />
      </div>
    </main>
  );
}
