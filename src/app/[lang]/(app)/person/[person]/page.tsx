import { notFound } from 'next/navigation';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import PersonFilmography from './_components/PersonFilmography';
import { getPerson } from './getPerson';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const person = await getPerson(params.person, params.lang);
  if (!person) return {
      title: 'Oups, personne introuvable !',
  }
  return {
    title: person.name,
    description: `This is the page of ${person.name}`,
  };
}

export default async function Person({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const person = await getPerson(params.person, params.lang);
  if (!person) notFound();
  return (
    <>
      <PersonHeader person={person} background={person.backdrop_path} />
      <div className="px-4 pb-4">
        {/* <PersonNavbar focus={"oeuvre"} personId={person.id} /> */}
        <PersonFilmography
          person={person}
          departments={person.departments}
          mainDepartment={person.known_for_department ?? undefined}
        />
      </div>
    </>
  );
}
