'use client';

import { JustWatchWidget } from "@/components/JustWatch/JustWatchWidget";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import Link from "next/link";

export default function MovieDescription({
  movie,
}: {
  movie: any
}) {
  if (!movie) return null;

  return (
    <div className="@container/movie-description flex flex-col gap-4">
      {/* OVERVIEW
        {movie.data[0].overview &&
          <div className=" text-justify">
            {movie.data[0].overview}
          </div>
        } */}
      <div className="flex flex-col @4xl/movie-description:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-lg font-medium">Description</h2>
          <div className="text-justify text-muted-foreground">
            {movie.overview ?? 'No description available'}
          </div>
          {/* {movie.data[0].overview ? (
            <div className="text-justify text-muted-foreground">{movie.data[0].overview}</div>
          ) : (
            <div className="text-justify text-muted-foreground">No description available</div>
          )} */}
        </div>
        <JustWatchWidget
          id={movie.id}
          title={movie.title}
          type="movie"
          className="min-w-[20%]"
        />
        {/* <div className="min-w-[20%]">
          <h2 className="text-lg font-medium">Voir le film</h2>
        </div> */}
      </div>
      {/* CASTING */}
      <MovieCast cast={movie.cast} />
    </div>
  );
}

const MovieCast = ({
	cast,
} : {
	cast: any,
}) => {
	return (
		<div>
			<h2 className="text-lg font-medium">Casting</h2>
      {cast.length ? (
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
        <div className="text-justify text-muted-foreground">No cast available</div>
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
      href={'/person/' + credit.person?.id}
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
