'use client';
import { MediaTvSeriesSeason } from '@/types/type.db';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';

export default function TvSeasonDetails({
  season,
}: {
  season: MediaTvSeriesSeason;
}) {
  const common = useTranslations('common');
  return (
	<div className="@container/tv_season-details flex flex-col gap-4">
		<div>
			<h2 className="text-lg font-medium">
        {upperFirst(common('messages.episode', { count: season.episode_count }))}
      </h2>
			<p className="text-center text-muted-foreground">
        Work in progress...
      </p>
		</div>
  </div>
  );
}