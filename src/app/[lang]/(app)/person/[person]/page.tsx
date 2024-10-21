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
  const supabase = createServerClient(params.lang);
  const { data: person } = await supabase
		.from('person_full')
		.select(`*`)
		.eq('id', params.person)
		.single();

  if (!person) notFound();

  return (
    <main>
      <PersonHeader person={person} background={person.backdrop_path} />
      <div className="px-4 pb-4">
        {/* <PersonNavbar focus={"oeuvre"} personId={person.id} /> */}
        <PersonFilmography
          person={person}
          departments={person.departments}
          mainDepartment={person.known_for_department ?? undefined}
        />
      </div>
    </main>
  );
}
