'use client';

import { JustWatchWidget } from "@/components/JustWatch/JustWatchWidget";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { Movie, MoviePerson } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function MovieDetails({
  movie,
}: {
  movie: Movie;
}) {
  const common = useTranslations('common');
  if (!movie) return null;

  return (
    <div className="@container/movie-details flex flex-col gap-4">
      <div className="flex flex-col @4xl/movie-details:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-lg font-medium">{upperFirst(common('word.overview'))}</h2>
          <div className="text-justify text-muted-foreground">
            {movie.overview ?? upperFirst(common('messages.no_overview'))}
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
      <MovieCast cast={movie.cast} />
    </div>
  );
}

const MovieCast = ({
	cast,
} : {
	cast?: MoviePerson[]
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
			{/* <CrewModal crew={movie.credits.crew} /> */}
		</div>
	)
}

function CastPoster({
  credit
} : {
  credit: any
}) {
	return (
	  <Link
      href={`/person/${credit.person?.slug ?? credit.person?.id}`}
      className={`
        flex flex-col items-center
        h-full 
        bg-muted hover:bg-muted-hover transition-all
        w-[125px] lg:w-[150px]
        rounded-xl p-2 gap-2 text-center
      `}
    >
		  {/* AVATAR */}
      <div className="w-full shadow-2xl">
        <AspectRatio ratio={3 / 4}>
          <ImageWithFallback
            src={`https://image.tmdb.org/t/p/original/${credit.person?.profile_path}`}
            alt={credit.person.name ?? ''}
            type="person"
            className="rounded-md object-cover"
            fill
            sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120,
              150px
            `}
          />
        </AspectRatio>
      </div>
      {/* NAME */}
      <div className="line-clamp-2 break-words">{credit.person?.name}</div>
      <div className="line-clamp-2 text-accent-1 italic text-sm">
        {credit.role?.character}
      </div>
	  </Link>
	);
}
