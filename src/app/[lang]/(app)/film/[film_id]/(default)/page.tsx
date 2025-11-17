import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getMovie } from '@/features/server/media/mediaQueries';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { seoLocales } from '@/lib/i18n/routing';
import MovieDetails from './_components/MovieDetails';
import { Movie, WithContext } from 'schema-dts';
import { toISO8601Duration } from '@/lib/utils';
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
    title: t('pages.film.metadata.title', { title: movie.title!, year: new Date(String(movie.release_date)).getFullYear() }),
    description: truncate(
      movie.directors
        ? t('pages.film.metadata.description', {
          title: movie.title!,
          directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.directors.map((director) => director.name ?? '')),
          year: new Date(String(movie.release_date)).getFullYear(),
          overview: movie.overview || '',
        }) : t('pages.film.metadata.description_no_director', {
          title: movie.title!,
          year: new Date(String(movie.release_date)).getFullYear(),
          overview: movie.overview || ''
        }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: seoLocales(params.lang, `/film/${movie.slug}`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('pages.film.metadata.title', { title: movie.title!, year: new Date(String(movie.release_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        movie.directors
          ? t('pages.film.metadata.description', {
            title: movie.title!,
            directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.directors.map((director) => director.name ?? '')),
            year: new Date(String(movie.release_date)).getFullYear(),
            overview: movie.overview || '',
          }) : t('pages.film.metadata.description_no_director', {
            title: movie.title!,
            year: new Date(String(movie.release_date)).getFullYear(),
            overview: movie.overview || ''
          }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/film/${movie.slug}`,
      images: movie.poster_url ? [
        { url: movie.poster_url },
      ] : undefined,
      type: 'video.movie',
      locale: params.lang,
    }
  };
}

export default async function MoviePage(
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
  const jsonLd: WithContext<Movie> = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title ?? undefined,
    image: movie.poster_url ?? undefined,
    description: movie.overview ?? undefined,
    datePublished: movie.release_date ?? undefined,
    dateModified: new Date().toISOString(),
    duration: movie.runtime ? toISO8601Duration(movie.runtime) : undefined,
    director: movie.directors
      ?.map(director => ({
        '@type': 'Person',
        name: director.name ?? undefined,
        image: director.profile_url ?? undefined,
      })),
    actor: movie.cast
      ?.map((actor) => ({
        '@type': 'Person',
        name: actor.person?.name ?? undefined,
        image: actor.person?.profile_url ?? undefined,
      })),
    genre: movie.genres?.map((genre) => genre.name),
    aggregateRating: movie.vote_average ? {
      '@type': 'AggregateRating',
      ratingValue: movie.vote_average,
      ratingCount: movie.vote_count ?? 0,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MovieDetails movie={movie} />
    </>
  );
}
