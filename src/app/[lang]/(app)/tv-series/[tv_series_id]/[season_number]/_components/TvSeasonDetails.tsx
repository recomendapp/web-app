'use client';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { MediaTvSeriesSeason } from '@recomendapp/types/dist';
import { upperFirst } from 'lodash';
import { useFormatter, useTranslations } from 'next-intl';

export default function TvSeasonDetails({
  season,
}: {
  season: MediaTvSeriesSeason;
}) {
  const common = useTranslations('common');
  const format = useFormatter();
  return (
	<div className="@container/tv_season-details flex flex-col gap-4">
		<div>
			<h2 className="text-lg font-medium">
        {upperFirst(common('messages.tv_episode', { count: season.episode_count! }))}
      </h2>
      <div className='mx-auto max-w-xl space-y-2'>
        {season.episodes?.map((episode, i) => (
          <Card key={i} className="@container/episode-card flex flex-row items-center gap-2 p-2 hover:bg-muted-hover hover:cursor-pointer">
            <div className="shrink-0 relative w-32 @sm/episode-card:w-40 @md/episode-card:w-48 aspect-video rounded-md overflow-hidden">
              <ImageWithFallback
                src={episode.still_url ?? ''}
                alt={upperFirst(common('messages.tv_episode_value', { number: episode.episode_number! }))}
                fill
                className="object-cover"
                type="tv_episode"
                sizes={`
                  (max-width: 640px) 96px,
                  (max-width: 1024px) 120px,
                  150px
                `}
              />
              <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                {(episode.vote_average) ? <IconMediaRating
                  rating={episode.vote_average}
                  variant="general"
                  className="w-full"
                /> : null}
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className="line-clamp-2 break-words font-bold">
                <span className='text-accent-yellow font-normal'>{upperFirst(common('messages.tv_episode_short', { seasonNumber: season.season_number!, episodeNumber: episode.episode_number! }))}</span>
                {" • "}
                {episode.name ?? upperFirst(common('messages.tv_episode_value', { number: episode.episode_number! }))}
              </h3>
              <p className="line-clamp-2 break-words">{episode.overview ?? upperFirst(common('messages.no_overview'))}</p>
              <h4 className='text-sm text-muted-foreground'>{`${upperFirst(common('messages.first_air_date'))} : ${episode.air_date ? format.dateTime(new Date(episode.air_date), { year: 'numeric', month: 'long', day: 'numeric' }) : upperFirst(common('messages.unknown'))}`}</h4>
            </div>
          </Card>
        ))}
      </div>
		</div>
  </div>
  );
}