import { siteConfig } from '@/config/site';
import { getMovie } from '@/features/server/media/mediaQueries';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { seoLocales } from '@/lib/i18n/routing';
import { truncate, upperFirst } from 'lodash';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MoviePlaylists } from './_components/MoviePlaylists';
import { SupportedLocale } from '@/translations/locales';

export async function generateMetadata(
  props: {
      params: Promise<{
        lang: string;
        film_id: string;
      }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { id: movieId} = getIdFromSlug(params.film_id);
  const movie = await getMovie(params.lang, movieId);
  if (!movie) return { title: upperFirst(t('common.messages.film_not_found')) };
  return {
    title: t('pages.film.playlists.metadata.title', { title: movie.title!, year: new Date(String(movie.release_date)).getFullYear() }),
    description: truncate(
      t('pages.film.playlists.metadata.description', {
        title: movie.title!,
      }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: seoLocales(params.lang, `/film/${movie.slug}/playlists`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('pages.film.playlists.metadata.title', { title: movie.title!, year: new Date(String(movie.release_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        t('pages.film.playlists.metadata.description', {
          title: movie.title!,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/film/${movie.slug}/playlists`,
      images: movie.poster_url ? [
        { url: movie.poster_url },
      ] : undefined,
      type: 'video.movie',
      locale: params.lang,
    }
  };
}

export default async function Reviews(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie(params.lang, movieId);
  if (!movie) notFound();
  return <MoviePlaylists movieId={movieId} />;
}
