import { notFound } from 'next/navigation';
import { getReview } from '@/features/server/reviews';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import Review from '@/components/Review/Review';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

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
    description: undefined, // TODO
    alternates: {
      canonical: `${siteConfig.url}/review/${params.review_id}`,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: t('title', { title: review.activity?.media?.title, username: review.activity?.user?.username }),
      description: undefined, // TODO
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
  return <Review reviewServer={review} />;
}
