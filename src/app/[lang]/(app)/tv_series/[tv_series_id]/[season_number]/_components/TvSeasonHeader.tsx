'use client';
import MoviePoster from '@/components/Movie/MoviePoster';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { MediaTvSeriesSeason } from '@/types/type.db';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import { useRandomImage } from '@/hooks/use-random-image';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/routing';
import { TMDB_IMAGE_BASE_URL } from '@/lib/tmdb/tmdb';

export default function TvSeasonHeader({
	urlSerie,
	season,
}: {
	urlSerie: string;
	season: MediaTvSeriesSeason;
}) {
	const common = useTranslations('common');
	const title = upperFirst(common('messages.season_value', { number: season.season_number! }));
	const randomBg = useRandomImage(season.episodes?.map(episode => ({
		src: episode.avatar_path ?? '',
		alt: upperFirst(common('messages.episode_value', { number: episode.episode_number! })),
	})) ?? []);
	if (!season) return null;
	return (
	<HeaderBox className='@xl/header-box:h-fit' background={randomBg ? { src: `${TMDB_IMAGE_BASE_URL}/w1280${randomBg.src}`, alt: randomBg.alt ?? '', unoptimized: true } : undefined}>
		<div className="flex flex-row w-full gap-4 items-center">
			{/* SERIE POSTER */}
			<MoviePoster
			className="w-[80px] @md/header-box:w-[100px] @lg/header-box:w-[120px] @xl/header-box:w-[150px]"
			src={season.avatar_url ?? ''}
			alt={title}
			fill
			sizes={`
				(max-width: 640px) 96px,
				(max-width: 1024px) 120px,
				150px
			`}
			>
			<div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
				{(season.tmdb_vote_average) ? <IconMediaRating
					rating={season.tmdb_vote_average}
					variant="general"
					className="w-full"
				/> : null}
			</div>
			</MoviePoster>
			<div className="flex flex-col justify-between gap-2 w-full h-full py-4">
				<div>
					<span className='text-accent-yellow'>{upperFirst(common('messages.season', { count: 1 }))}</span>
					{season.serie && <span className="before:content-['_|_']">
						<Button variant={'link'} className=" w-fit p-0 font-normal" asChild>
							<Link href={urlSerie}>
							{season.serie.title}
							</Link>
						</Button>
					</span>}
				</div>
				<h1 className="text-clamp space-x-1">
					<span className='font-bold select-text'>{title}</span>
					{season.title && (
						<div className='text-base font-semibold text-muted-foreground'>{season.title}</div>
					)}
				</h1>
				<div>
					{common('messages.episode_count', { count: season.episode_count! })}
				</div>
			</div>
		</div>
	</HeaderBox>
  );
}