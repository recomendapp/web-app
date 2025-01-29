import { notFound } from 'next/navigation';
// import { getPerson } from '@/features/server/persons';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { WidgetPersonMostRated } from './_components/WidgetPersonMostRated';
import { WidgetPersonFilms } from './_components/WidgetPersonFilms';
import { WidgetPersonTvSeries } from './_components/WidgetPersonTvSeries';
import { getPerson } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      person_id: string;
    }>;
  }
) {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const { id } = getIdFromSlug(params.person_id);
  const person = await getPerson({
    id: id,
    locale: params.lang,
  });
  if (!person) return { title: upperFirst(common('errors.person_not_found')) };
  return {
    title: `${person.name} (${person.known_for_department})`,
    description: person.biography,
  };
}

export default async function Person(
  props: {
    params: Promise<{
      lang: string;
      person_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id } = getIdFromSlug(params.person_id);
  const person = await getPerson({
    id: id,
    locale: params.lang,
  });
  if (!person) notFound();
  return (
    <>
        <WidgetPersonMostRated personId={id} lang={params.lang} />
        <WidgetPersonFilms personSlug={params.person_id} credits={person.movies} lang={params.lang} />
    </>
  );
}
