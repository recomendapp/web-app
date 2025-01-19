'use client';

import { JustWatchWidget } from "@/components/JustWatch/JustWatchWidgetScript";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { Movie, MoviePerson, TvSerie, TvSeriePerson } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function TvSerieDetails({
  serie,
}: {
  serie: TvSerie;
}) {
  const common = useTranslations('common');
  if (!serie) return null;

  return (
    <div className="@container/movie-details flex flex-col gap-4">
      <div className="flex flex-col @4xl/movie-details:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-lg font-medium">{upperFirst(common('word.overview'))}</h2>
          <div className="text-justify text-muted-foreground">
            {serie.overview ?? upperFirst(common('messages.no_overview'))}
          </div>
        </div>
        <JustWatchWidget
          id={serie.id}
          title={serie.name ?? ''}
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
	cast?: TvSeriePerson[]
}) => {
  const common = useTranslations('common');
	return (
		<div>
			<h2 className="text-lg font-medium">{upperFirst(common('messages.cast'))}</h2>
      {(cast && cast?.length > 0) ? (
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {cast?.map((actor: any) => (
              <div key={actor.id}>
                <CastPoster credit={actor} />
              </div>
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
  credit
} : {
  credit: any
}) {
  return (
    <Link href={`/person/${credit.person?.slug ?? credit.person?.id}`}>
      <Card className="flex flex-col gap-2 h-full w-32 p-2 hover:bg-muted-hover">
        <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
          <ImageWithFallback
            src={credit.person?.profile_path ? `https://image.tmdb.org/t/p/original/${credit.person?.profile_path}` : ''}
            alt={credit.person?.name ?? ''}
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
          <p className="line-clamp-2 break-words">{credit.person?.name}</p>
          <p className="line-clamp-2 text-accent-1 italic text-sm">{credit.character}</p>
        </div>
      </Card>
    </Link>
  );
}
