import MoviePoster from "@/components/Movie/MoviePoster";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

const MovieHoverCard = ({ movie }: { movie: any }) => {
	return (
	  <HoverCard>
		<HoverCardTrigger asChild>
		  <Link href={`/film/${movie.id}`} className='hover:text-accent-pink transition'>
			{movie.title}
		  </Link>
		</HoverCardTrigger>
		<HoverCardContent align='center' className="w-52">
		  <div className="flex justify-between space-x-4">
			<MoviePoster
			  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
			  alt={movie.title ?? ''}
			  fill
			  sizes={`
				(max-width: 640px) 96px,
				(max-width: 1024px) 120px,
				150px
			  `}
			/>
		  </div>
		</HoverCardContent>
	  </HoverCard>
	);
}

export default MovieHoverCard;