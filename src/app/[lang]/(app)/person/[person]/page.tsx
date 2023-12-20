import { getMovieDetails, getPersonDetails } from '@/lib/tmdb/tmdb';
import MovieHeader from './components/PersonHeader';
import MovieDescription from './components/PersonDescription';
import MovieNavbar from './components/PersonNavbar';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import PersonHeader from './components/PersonHeader';
import PersonNavbar from './components/PersonNavbar';
import PersonDescription from './components/PersonDescription';

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
  params
}: {
  params: {
    lang: string;
    person: string;
  }
}) {
  const supabase = createServerClient();
  const { data: isExist } = await supabase.from('person').select('id').eq('id', params.person).single();
  const person = await getPersonDetails(params.person, params.lang);
  if (!person) notFound();
  if (!isExist && person) {
      const { error } = await supabase.from('person').insert({ id: person.id });
      if (error) return notFound();
  }

  return (
    <main>
      <PersonHeader person={person} />
      <div className='px-4 pb-4'>
        {/* <PersonNavbar focus={"description"} personId={person.id} /> */}
        <PersonDescription person={person} />
      </div>
    </main>
  )
}
