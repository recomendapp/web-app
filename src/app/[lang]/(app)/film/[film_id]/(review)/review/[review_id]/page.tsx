import { notFound } from 'next/navigation';
import { getReviewMovie } from '@/features/server/reviews';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { Metadata } from 'next';
import { MovieReview } from './_components/MovieReview';
import { Review, WithContext } from 'schema-dts';
import { getRawReviewText } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { seoLocales } from '@/lib/i18n/routing';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      review_id: number;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.metadata' });
  const review = await getReviewMovie(params.review_id, params.lang);
  if (!review) return { title: upperFirst(common('messages.review_not_found')) };
  return {
    title: t('title', { title: review.activity?.movie?.title!, username: review.activity?.user?.username! }),
    description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
    alternates: seoLocales(params.lang, `/review/${review.id}`),
    openGraph: {
      siteName: siteConfig.name,
      title: t('title', { title: review.activity?.movie?.title!, username: review.activity?.user?.username! }),
      description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/${params.lang}/review/${params.review_id}`,
      images: review.activity?.movie?.avatar_url ? [
        { url: review.activity?.movie?.avatar_url },
      ] : undefined,
      type: 'article',
      locale: params.lang,
    },
  };
}

export default async function ReviewPage(
  props: {
    params: Promise<{
      lang: string;
        review_id: number;
    }>;
  }
) {
  const params = await props.params;
  const review = await getReviewMovie(params.review_id, params.lang);
  if (!review) notFound();
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.metadata' });
  const { movie } = review.activity || {};
  const jsonLd: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: t('title', { title: movie?.title!, username: review.activity?.user?.username! }),
    description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
    datePublished: review.created_at,
    dateModified: review.updated_at,
    itemReviewed: movie ? {
      '@type': 'Movie',
      name: movie.title ?? undefined,
      image: movie.avatar_url ?? undefined,
      description: ("overview" in movie.extra_data && movie.extra_data.overview?.length) ? movie.extra_data.overview : undefined,
      director: movie.main_credit
        ?.map(director => ({
          '@type': 'Person',
          name: director.title ?? undefined,
          image: director.avatar_url ?? undefined,
        })),
      actor: "cast" in movie ? movie.cast
        ?.map((actor) => ({
          '@type': 'Person',
          name: actor.person?.title ?? undefined,
          image: actor.person?.avatar_url ?? undefined,
        })) : undefined,
      genre: movie.genres?.map((genre) => genre.name),
      aggregateRating: (movie.vote_average || movie.tmdb_vote_average) ? {
        '@type': 'AggregateRating',
        ratingValue: movie.vote_average ?? movie.tmdb_vote_average ?? undefined,
        ratingCount: movie.vote_count ?? movie.tmdb_vote_count ?? 0,
        bestRating: 10,
        worstRating: 1,
      } : undefined,
    } : undefined,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.activity?.rating ?? undefined,
      bestRating: 10,
      worstRating: 1,
    }
  };
  return (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <MovieReview reviewServer={review} />;
  </>
  );
}
