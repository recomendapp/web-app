import { notFound } from 'next/navigation';
import { getReview } from '@/features/server/reviews';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import ReviewComponent from '@/components/Review/Review';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { type Review, WithContext } from 'schema-dts';
import { getRawReviewText } from '@/lib/utils';

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
  const review = await getReview(params.review_id, params.lang);
  if (!review) return { title: upperFirst(common('errors.review_not_found')) };
  return {
    title: t('title', { title: review.activity?.media?.title, username: review.activity?.user?.username }),
    description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
    alternates: {
      canonical: `${siteConfig.url}/review/${params.review_id}`,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: t('title', { title: review.activity?.media?.title, username: review.activity?.user?.username }),
      description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/review/${params.review_id}`,
      images: review.activity?.media?.avatar_url ? [
        { url: review.activity?.media?.avatar_url },
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
  const review = await getReview(params.review_id, params.lang);
  if (!review) notFound();
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.review.metadata' });
  const jsonLd: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: t('title', { title: review.activity?.media?.title, username: review.activity?.user?.username }),
    description: truncate(getRawReviewText({ data: review.body }), { length: siteConfig.seo.description.limit }),
    datePublished: review.created_at,
    dateModified: review.updated_at,
    itemReviewed: {
      '@type': 'Movie',
      name: review.activity?.media?.title ?? undefined,
      image: review.activity?.media?.avatar_url ?? undefined,
      description: review.activity?.media?.extra_data?.overview ?? undefined,
      director: review.activity?.media?.main_credit
        ?.map(director => ({
          '@type': 'Person',
          name: director.title ?? undefined,
          image: director.avatar_url ?? undefined,
        })),
      actor: review.activity?.media?.cast
        ?.map((actor) => ({
          '@type': 'Person',
          name: actor.person?.title ?? undefined,
          image: actor.person?.avatar_url ?? undefined,
        })),
      genre: review.activity?.media?.genres?.map((genre) => genre.name),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: review.activity?.media?.vote_average ?? review.activity?.media?.tmdb_vote_average ?? undefined,
        ratingCount: review.activity?.media?.vote_count ?? (review.activity?.media?.vote_average ? 1 : (review.activity?.media?.tmdb_vote_count ?? 0)),
        bestRating: 10,
        worstRating: 1,
      },
    },
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
      <ReviewComponent reviewServer={review} />
    </>
  );
}
