'use client'

import { JustWatchWidget } from "@/components/JustWatch/JustWatchWidgetScript";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { MediaMovie, MediaPerson } from "@recomendapp/types";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getTmdbImage } from "@/lib/tmdb/getTmdbImage";

export default function MovieDetails({
  movie,
}: {
  movie: MediaMovie;
}) {
  const t = useTranslations();
  if (!movie) return null;

  return (
    <div className="@container/movie-details flex flex-col gap-4">
      <div className="flex flex-col @4xl/movie-details:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-lg font-medium">{upperFirst(t('common.messages.overview'))}</h2>
          <div className="text-justify text-muted-foreground">
            {movie.overview ?? upperFirst(t('common.messages.no_overview'))}
          </div>
        </div>
        <JustWatchWidget
          id={movie.id}
          title={movie.title ?? ''}
          type="movie"
          className="min-w-[20%]"
        />
      </div>
      {/* CASTING */}
      <MovieCast movie={movie} />
    </div>
  );
}

const MovieCast = ({
	movie,
} : {
	movie: MediaMovie
}) => {
  const t = useTranslations();
	return (
		<div>
			<h2 className="text-lg font-medium">{upperFirst(t('common.messages.cast'))}</h2>
      {(movie.cast && movie.cast?.length > 0) ? (
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {movie.cast?.map(({ person }, i) => (
              <CastPoster key={i} person={person} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="text-justify text-muted-foreground">{upperFirst(t('common.messages.no_cast'))}</div>
      )}
		</div>
	)
}

function CastPoster({
  person,
  characters,
} : {
  person?: MediaPerson,
  characters?: string[] | null,
}) {
  if (!person) return null;
  return (
    <Link href={person.url ?? ''}>
      <Card className="flex flex-col gap-2 h-full w-32 p-2 hover:bg-muted-hover">
        <div className="relative w-full aspect-3/4 rounded-md overflow-hidden">
          <ImageWithFallback
          src={getTmdbImage({ path: person.profile_path, size: 'w342' })}
          alt={person.name ?? ''}
          fill
          className="object-cover"
          type="person"
          unoptimized
          />
        </div>
        <div className="text-center">
          <p className="line-clamp-2 wrap-break-word">{person.name}</p>
          {characters ? <p className="line-clamp-2 text-accent-yellow italic text-sm">{characters.join(', ')}</p> : null}
        </div>
      </Card>
    </Link>
  );
}