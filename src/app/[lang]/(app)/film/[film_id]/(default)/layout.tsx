import { notFound } from 'next/navigation';
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getMediaFollowersAverageRating, getMovie } from '@/features/server/media/mediaQueries';

export async function generateMetadata(
    props: {
        params: Promise<{
          lang: string;
          film_id: string;
        }>;
    }
) {
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
		description: movie.main_credit
			? t('metadata.description', {
				title: movie.title,
				directors: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(movie.main_credit.map((director) => director.title ?? '')),
				year: new Date(String(movie.extra_data.release_date)).getFullYear(),
				overview: movie.extra_data.overview,
			}) : t('metadata.description_no_director', {
				title: movie.title,
				year: new Date(String(movie.extra_data.release_date)).getFullYear(),
				overview: movie.extra_data.overview,
			}),
	};
}

export default async function MovieLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{
          lang: string;
          film_id: string;
        }>;
    }
) {
    const params = await props.params;

    const {
        children
    } = props;

    const { id: movieId } = getIdFromSlug(params.film_id);
    const movie = await getMovie({
      id: movieId,
      locale: params.lang,
    });
    if (!movie) notFound();
    const followersAvgRating = await getMediaFollowersAverageRating({
      media_id: movie.media_id!,
    })
    return (
		<>
			<MovieHeader movie={movie} followersAvgRating={followersAvgRating?.follower_avg_rating} />
			<div className="px-4 pb-4">
				<MovieNavbar movieSlug={params.film_id} />
				{children}
			</div>
		</>
	);
};
