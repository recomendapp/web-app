'use client';

import { JustWatchWidget } from "@/components/JustWatch/JustWatchWidgetScript";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { MediaTvSeries, MediaPerson, MediaTvSeriesPerson } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { IconMediaRating } from "@/components/Media/icons/IconMediaRating";
import { Separator } from "@/components/ui/separator";

export default function TvSerieDetails({
  slug,
  serie,
}: {
  slug: string;
  serie: MediaTvSeries;
}) {
  const common = useTranslations('common');
  if (!serie) return null;
  return (
    <div className="@container/movie-details flex flex-col gap-4">
      <div className="flex flex-col @4xl/movie-details:grid @4xl/movie-details:grid-cols-3 gap-4">
        <div className="@4xl/movie-details:col-span-2">
          <h2 className="text-lg font-medium">{upperFirst(common('messages.overview'))}</h2>
          <div className="text-justify text-muted-foreground">
            {serie.overview ?? upperFirst(common('messages.no_overview'))}
          </div>
        </div>
        <JustWatchWidget
          id={serie.id}
          title={serie.name ?? ''}
          type="show"
          className="@4xl/movie-details:col-span-1"
        />
      </div>
      <div className="flex flex-col @4xl/movie-details:grid @4xl/movie-details:grid-cols-3 gap-4">
         <div className={`@4xl/movie-details:col-span-${serie.specials && serie.specials.length > 0 ? '2' : '3'}`}>
          <h2 className="text-lg font-medium">
            {upperFirst(common('messages.tv_season', { count: serie.seasons?.length! }))}
            <span className="text-muted-foreground">{` ${serie.seasons?.length}`}</span>
          </h2>
          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {serie.seasons?.map((season, i) => (
                <Link key={i} href={`/tv_series/${slug}/${season.season_number}`}>
                  <Card className="flex flex-col gap-2 h-full w-32 p-2 hover:bg-muted-hover">
                    <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
                      <ImageWithFallback
                        src={season.poster_url ?? ''}
                        alt={upperFirst(common('messages.tv_season_value', { number: season.season_number! }))}
                        fill
                        className="object-cover"
                        type="tv_season"
                        sizes={`
                          (max-width: 640px) 96px,
                          (max-width: 1024px) 120px,
                          150px
                        `}
                      />
                      <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                        {season.vote_count ? <IconMediaRating
                          rating={season.vote_average}
                          variant="general"
                          className="w-full"
                        /> : null}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="line-clamp-2 break-words">{upperFirst(common('messages.tv_season_value', { number: season.season_number! }))}</p>
                      <p className="text-sm text-muted-foreground">{upperFirst(common('messages.tv_episode_count', { count: season.episode_count! }))}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        {(serie.specials && serie.specials.length > 0) && (
          <div className="@4xl/movie-details:col-span-1">
            <h2 className="text-lg font-medium">
              {upperFirst(common('messages.tv_special_episode', { count: serie.specials?.reduce((acc, s) => acc + (s.episode_count ?? 0), 0) }))}
              <span className="text-muted-foreground">{` ${serie.specials?.length}`}</span>
            </h2>
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {serie.specials?.map((special, i) => (
                  <Link key={i} href={`/tv_series/${slug}/${special.season_number}`}>
                    <Card className="flex flex-col gap-2 h-full w-32 p-2 hover:bg-muted-hover">
                      <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
                        <ImageWithFallback
                          src={special.poster_url ?? ''}
                          alt={upperFirst(common('messages.tv_season_value', { number: special.season_number! }))}
                          fill
                          className="object-cover"
                          type="tv_season"
                          sizes={`
                            (max-width: 640px) 96px,
                            (max-width: 1024px) 120px,
                            150px
                          `}
                        />
                        <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                          {special.vote_average ? <IconMediaRating
                            rating={special.vote_average}
                            variant="general"
                            className="w-full"
                          /> : null}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="line-clamp-2 break-words">{upperFirst(common('messages.tv_season_value', { number: special.season_number! }))}</p>
                        <p className="text-sm text-muted-foreground">{upperFirst(common('messages.tv_episode_count', { count: special.episode_count! }))}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </div>
      {/* CASTING */}
      <SerieCast cast={serie.cast} />
    </div>
  );
}

const SerieCast = ({
	cast,
} : {
	cast?: MediaTvSeriesPerson[]
}) => {
  const common = useTranslations('common');
	return (
		<div>
			<h2 className="text-lg font-medium">{upperFirst(common('messages.cast'))}</h2>
      {(cast && cast?.length > 0) ? (
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {cast?.map(({ person, character }, i) => (
              <CastPoster key={i} person={person} character={character} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="text-justify text-muted-foreground">{upperFirst(common('messages.no_cast'))}</div>
      )}
		</div>
	)
}

function CastPoster({
  person,
  character,
} : {
  person?: MediaPerson,
  character?: string | null,
}) {
  if (!person) return null;
  return (
    <Link href={person.url ?? ''}>
      <Card className="flex flex-col gap-2 h-full w-32 p-2 hover:bg-muted-hover">
        <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
          <ImageWithFallback
            src={person.profile_url ?? ''}
            alt={person.name ?? ''}
            fill
            className="object-cover"
            type="person"
            sizes={`
            (max-width: 640px) 96px,
            (max-width: 1024px) 120px,
            150px
            `}
          />
        </div>
        <div className="text-center">
          <p className="line-clamp-2 break-words">{person.name}</p>
          {character ? <p className="line-clamp-2 text-accent-yellow italic text-sm">{character}</p> : null}
        </div>
      </Card>
    </Link>
  );
}
