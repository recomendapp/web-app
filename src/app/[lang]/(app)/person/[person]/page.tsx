import { notFound } from 'next/navigation';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import { getPerson } from '@/features/server/persons';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { WidgetPersonMostRated } from './_components/WidgetPersonMostRated';
import { WidgetPersonFilms } from './_components/WidgetPersonFilms';
import { WidgetPersonTvSeries } from './_components/WidgetPersonTvSeries';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const { id } = getIdFromSlug(params.person);
  const person = await getPerson(id);
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
  const { id } = getIdFromSlug(params.person);
  const person = await getPerson(id);
  if (!person) notFound();
  return (
    <>
      <PersonHeader person={person} background={person.backdrop_path} />
      <div className="px-4 pb-4">
        <PersonNavbar personId={params.person} />
        <WidgetPersonMostRated personId={id} lang={params.lang} />
        <WidgetPersonFilms personId={id} lang={params.lang} />
        <WidgetPersonTvSeries personId={id} lang={params.lang} />
      </div>
    </>
  );
}
