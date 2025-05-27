'use client';
import MoviePoster from '@/components/Movie/MoviePoster';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { MediaTvSeriesSeason } from '@/types/type.db';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import { useRandomImage } from '@/hooks/use-random-image';

export default function TvSeasonHeader({
  season,
}: {
  season: MediaTvSeriesSeason;
}) {
  const common = useTranslations('common');
  const title = upperFirst(common('messages.season_value', { number: season.season_number }));
  const randomBg = useRandomImage(season.episodes?.map(episode => ({
	src: episode.avatar_url ?? '',
	alt: upperFirst(common('messages.episode_value', { number: episode.episode_number })),
  })) ?? []);
  if (!season) return null;
  return (
	<HeaderBox
	className='@container/tv_series_season-header @xl/header-box:h-fit'
	style={{
		backgroundImage: randomBg ? `url(${randomBg.src})` : undefined,
	}}
	>
	<div className="flex flex-row w-full gap-4 items-center">
		{/* SERIE POSTER */}
		<MoviePoster
		className="w-[80px] @md/tv_series_season-header:w-[100px] @lg/tv_series_season-header:w-[120px] @xl/tv_series_season-header:w-[150px]"
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
			</div>
			<h1 className="text-clamp space-x-1">
				<span className='font-bold select-text'>{title}</span>
				{season.title && (
                	<div className='text-base font-semibold text-muted-foreground'>{season.title}</div>
              	)}
			</h1>
			<div>
				{common('messages.episode_count', { count: season.episode_count })}
			</div>
		</div>
	</div>
	</HeaderBox>
  );
}