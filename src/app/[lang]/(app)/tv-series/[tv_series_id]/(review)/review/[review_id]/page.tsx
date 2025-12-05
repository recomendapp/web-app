import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { Metadata } from 'next';
import { getReviewTvSeries } from '@/features/server/reviews';
import { TvSeriesReview } from './_components/TvSeriesReview';
import { Review, WithContext } from 'schema-dts';
import { siteConfig } from '@/config/site';
import { seoLocales } from '@/lib/i18n/routing';
import { SupportedLocale } from '@/translations/locales';
import { generateJSON } from '@tiptap/html';
import { EDITOR_EXTENSIONS } from '@/components/tiptap/TiptapExtensions';
import { generateText } from '@tiptap/core';

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
  const review = await getReviewTvSeries(params.review_id, params.lang);
  if (!review) return { title: upperFirst(t('common.messages.review_not_found')) };
  const tiptapJson = generateJSON(review.body, EDITOR_EXTENSIONS);
  const rawText = generateText(tiptapJson, EDITOR_EXTENSIONS);
  return {
    title: t('pages.review.metadata.title', { title: review.activity?.tv_series?.name!, username: review.activity?.user?.username! }),
    description: truncate(rawText, { length: siteConfig.seo.description.limit }),
    alternates: seoLocales(params.lang, `/review/${review.id}`),
    openGraph: {
      siteName: siteConfig.name,
      title: t('pages.review.metadata.title', { title: review.activity?.tv_series?.name!, username: review.activity?.user?.username! }),
      description: truncate(rawText, { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/${params.lang}/review/${params.review_id}`,
      images: review.activity?.tv_series?.poster_url ? [
        { url: review.activity?.tv_series.poster_url },
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
  const review = await getReviewTvSeries(params.review_id, params.lang);
  if (!review) notFound();
  const tiptapJson = generateJSON(review.body, EDITOR_EXTENSIONS);
  const rawText = generateText(tiptapJson, EDITOR_EXTENSIONS);
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { tv_series } = review.activity || {};
  const jsonLd: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: t('pages.review.metadata.title', { title: tv_series?.name!, username: review.activity?.user?.username! }),
    description: truncate(rawText, { length: siteConfig.seo.description.limit }),
    datePublished: review.created_at,
    dateModified: review.updated_at,
    itemReviewed: tv_series ? {
      '@type': 'Movie',
      name: tv_series.name ?? undefined,
      image: tv_series.poster_url ?? undefined,
      description: ("overview" in tv_series && tv_series.overview?.length) ? tv_series.overview : undefined,
      director: tv_series.created_by
        ?.map(director => ({
          '@type': 'Person',
          name: director.name ?? undefined,
          image: director.profile_url ?? undefined,
        })),
      actor: "cast" in tv_series ? tv_series.cast
        ?.map((actor) => ({
          '@type': 'Person',
          name: actor.person?.name ?? undefined,
          image: actor.person?.profile_url ?? undefined,
        })) : undefined,
      genre: tv_series.genres?.map((genre) => genre.name),
      aggregateRating: tv_series.vote_average ? {
        '@type': 'AggregateRating',
        ratingValue: tv_series.vote_average ?? undefined,
        ratingCount: tv_series.vote_count ?? 0,
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
    <TvSeriesReview reviewServer={review} />
  </>
  );
}
