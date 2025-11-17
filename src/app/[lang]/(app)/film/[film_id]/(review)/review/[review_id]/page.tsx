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
import { SupportedLocale } from '@/translations/locales';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      review_id: number;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const review = await getReviewMovie(params.review_id, params.lang);
  if (!review) return { title: upperFirst(t('common.messages.review_not_found')) };
  return {
    title: t('pages.review.metadata.title', { title: review.activity?.movie?.title!, username: review.activity?.user?.username! }),
    description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
    alternates: seoLocales(params.lang, `/review/${review.id}`),
    openGraph: {
      siteName: siteConfig.name,
      title: t('pages.review.metadata.title', { title: review.activity?.movie?.title!, username: review.activity?.user?.username! }),
      description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/${params.lang}/review/${params.review_id}`,
      images: review.activity?.movie?.poster_url ? [
        { url: review.activity?.movie?.poster_url },
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
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { movie } = review.activity || {};
  const jsonLd: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: t('pages.review.metadata.title', { title: movie?.title!, username: review.activity?.user?.username! }),
    description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
    datePublished: review.created_at,
    dateModified: review.updated_at,
    itemReviewed: movie ? {
      '@type': 'Movie',
      name: movie.title ?? undefined,
      image: movie.poster_url ?? undefined,
      description: movie.overview ?? undefined,
      director: movie.directors
        ?.map(director => ({
          '@type': 'Person',
          name: director.name ?? undefined,
          image: director.profile_url ?? undefined,
        })),
      actor: "cast" in movie ? movie.cast
        ?.map((actor) => ({
          '@type': 'Person',
          name: actor.person?.name ?? undefined,
          image: actor.person?.profile_url ?? undefined,
        })) : undefined,
      genre: movie.genres?.map((genre) => genre.name),
      aggregateRating: movie.vote_average ? {
        '@type': 'AggregateRating',
        ratingValue: movie.vote_average,
        ratingCount: movie.vote_count ?? 0,
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
    <MovieReview reviewServer={review} />
  </>
  );
}
