import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getMovie } from '@/features/server/media/mediaQueries';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { locales } from '@/lib/i18n/locales';
import MovieDetails from './_components/MovieDetails';
import { Movie, WithContext } from 'schema-dts';
import { toISO8601Duration } from '@/lib/utils';

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
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.film' });
  const { id: movieId} = getIdFromSlug(params.film_id);
  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });
  if (!movie) return { title: upperFirst(common('errors.film_not_found')) };
  return {
    title: t('metadata.title', { title: movie.title, year: new Date(String(movie.extra_data.release_date)).getFullYear() }),
    description: truncate(
      movie.main_credit
        ? t('metadata.description', {
          title: movie.title,
          directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.main_credit.map((director) => director.title ?? '')),
          year: new Date(String(movie.extra_data.release_date)).getFullYear(),
          overview: movie.extra_data.overview,
        }) : t('metadata.description_no_director', {
          title: movie.title,
          year: new Date(String(movie.extra_data.release_date)).getFullYear(),
          overview: movie.extra_data.overview
        }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: {
      canonical: `${siteConfig.url}/${params.lang}/film/${movie.slug}`,
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${siteConfig.url}/${locale}/film/${movie.slug}`])
      ),
    },
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: movie.title, year: new Date(String(movie.extra_data.release_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        movie.main_credit
          ? t('metadata.description', {
            title: movie.title,
            directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.main_credit.map((director) => director.title ?? '')),
            year: new Date(String(movie.extra_data.release_date)).getFullYear(),
            overview: movie.extra_data.overview,
          }) : t('metadata.description_no_director', {
            title: movie.title,
            year: new Date(String(movie.extra_data.release_date)).getFullYear(),
            overview: movie.extra_data.overview
          }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/film/${movie.slug}`,
      images: movie.avatar_url ? [
        { url: movie.avatar_url },
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
  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });
  if (!movie) notFound();
  const jsonLd: WithContext<Movie> = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title ?? undefined,
    image: movie.avatar_url ?? undefined,
    description: movie.extra_data.overview,
    datePublished: movie.date ?? undefined,
    dateModified: new Date().toISOString(),
    duration: movie.extra_data.runtime ? toISO8601Duration(movie.extra_data.runtime) : undefined,
    director: movie.main_credit
      ?.map(director => ({
        '@type': 'Person',
        name: director.title ?? undefined,
        image: director.avatar_url ?? undefined,
      })),
    actor: movie.cast
      ?.map((actor) => ({
        '@type': 'Person',
        name: actor.person?.title ?? undefined,
        image: actor.person?.avatar_url ?? undefined,
      })),
    genre: movie.genres?.map((genre) => genre.name),
    aggregateRating: (movie.vote_average || movie.tmdb_vote_average) ? {
      '@type': 'AggregateRating',
      ratingValue: movie.vote_average ?? movie.tmdb_vote_average ?? undefined,
      ratingCount: movie.vote_count ?? movie.tmdb_vote_count ?? 0,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MovieDetails movie={movie} />;
    </>
  );
}
