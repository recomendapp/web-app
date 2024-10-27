import { notFound } from 'next/navigation';
import Review from './_components/Review';
import { getReview } from './getReview';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    review: string;
  };
}) {
  const review = await getReview(params.review, params.lang);
  if (!review) return { title: 'Oups, utilisateur introuvable !' };
  return {
    title: `${review.title} by (@${review.user?.username})`,
    description: `Critique de ${review.movie?.title} par @${review.user?.username}`,
  };
}

export default async function ReviewPage({
  params,
}: {
  params: {
    lang: string;
	  review: string;
  };
}) {
  const review = await getReview(params.review, params.lang);
  if (!review) notFound();

  return <Review reviewServer={review} />;
}
