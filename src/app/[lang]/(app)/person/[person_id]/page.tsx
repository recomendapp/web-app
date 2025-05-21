import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { WidgetPersonFilms } from './_components/WidgetPersonFilms';
import { getPerson } from '@/features/server/media/mediaQueries';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      person_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const { id } = getIdFromSlug(params.person_id);
  const person = await getPerson({
    id: id,
    locale: params.lang,
  });
  if (!person) return { title: upperFirst(common('errors.person_not_found')) };
  return {
    title: `${person.title} • ${person.extra_data.known_for_department}`,
    description: truncate(person.extra_data.biography, { length: siteConfig.seo.description.limit }),
    alternates: {
      canonical: `${siteConfig.url}/person/${person.slug}`,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: `${person.title} • ${person.extra_data.known_for_department} • ${siteConfig.name}`,
      description: truncate(person.extra_data.biography, { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/person/${person.slug}`,
      images: person.avatar_url ? [
        { url: person.avatar_url },
      ] : undefined,
      type: 'profile',
      locale: params.lang,
    }
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
        {/* <WidgetPersonMostRated personId={id} lang={params.lang} /> */}
        <WidgetPersonFilms personSlug={params.person_id} credits={person.movies} lang={params.lang} />
    </>
  );
}
