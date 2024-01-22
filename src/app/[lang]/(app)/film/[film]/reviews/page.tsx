import { ShowReviews } from '@/components/Review/ShowReviews/ShowReviews';

export default async function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {

  return (<ShowReviews filmId={String(params.film)} />);
}
