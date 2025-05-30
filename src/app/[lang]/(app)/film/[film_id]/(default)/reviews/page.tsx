import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getMovie } from '@/features/server/media/mediaQueries';
import Reviews from '@/components/Review/Reviews';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { truncate, upperFirst } from 'lodash';
import { seoLocales } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
      params: Promise<{
        lang: string;
        film_id: string;
      }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.film.reviews' });
  const { id: movieId} = getIdFromSlug(params.film_id);
  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });
  if (!movie) return { title: upperFirst(common('errors.film_not_found')) };
  return {
    title: t('metadata.title', { title: movie.title!, year: new Date(String(movie.extra_data.release_date)).getFullYear() }),
    description: truncate(
      t('metadata.description', {
        title: movie.title!,
      }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: {
      canonical: `${siteConfig.url}/film/${movie.slug}/reviews`,
      languages: Object.fromEntries([
        ['x-default', `${siteConfig.url}/film/${movie.slug}/reviews`],
        ...seoLocales.map((locale) => [locale, `${siteConfig.url}/${locale}/film/${movie.slug}/reviews`])
      ])
    },
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: movie.title!, year: new Date(String(movie.extra_data.release_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        t('metadata.description', {
          title: movie.title!,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/film/${movie.slug}/reviews`,
      images: movie.avatar_url ? [
        { url: movie.avatar_url },
      ] : undefined,
      type: 'video.movie',
      locale: params.lang,
    }
  };
}

export default async function MovieReviewsPage(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });
  if (!movie) notFound();
  return <Reviews mediaId={movie.media_id!} />;
}
