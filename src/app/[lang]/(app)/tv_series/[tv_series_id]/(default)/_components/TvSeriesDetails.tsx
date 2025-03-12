'use client';

import { JustWatchWidget } from "@/components/JustWatch/JustWatchWidgetScript";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { MediaTvSeries, MediaPerson, MediaTvSeriesPerson } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export default function TvSerieDetails({
  serie,
}: {
  serie: MediaTvSeries;
}) {
  const common = useTranslations('common');
  if (!serie) return null;
  return (
    <div className="@container/movie-details flex flex-col gap-4">
      <div className="flex flex-col @4xl/movie-details:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-lg font-medium">{upperFirst(common('word.overview'))}</h2>
          <div className="text-justify text-muted-foreground">
            {serie.extra_data.overview ?? upperFirst(common('messages.no_overview'))}
          </div>
        </div>
        <JustWatchWidget
          id={serie.id}
          title={serie.title ?? ''}
          type="show"
          className="min-w-[20%]"
        />
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
            src={person.avatar_url ?? ''}
            alt={person.title ?? ''}
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
          <p className="line-clamp-2 break-words">{person.title}</p>
          {character ? <p className="line-clamp-2 text-accent-yellow italic text-sm">{character}</p> : null}
        </div>
      </Card>
    </Link>
  );
}
