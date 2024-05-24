import MoviePoster from "@/components/Movie/MoviePoster";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

const MovieHoverCard = ({ movie }: { movie: any }) => {
	return (
	  <HoverCard>
		<HoverCardTrigger asChild>
		  <Link href={`/film/${movie.id}`} className='hover:text-accent-pink transition'>
			{movie.data[0].title}
		  </Link>
		</HoverCardTrigger>
		<HoverCardContent align='center' className="w-52">
		  <div className="flex justify-between space-x-4">
			<MoviePoster
			  poster_path={`https://image.tmdb.org/t/p/original/${movie.data[0].poster_path}`}
			  alt={movie.data[0].title ?? ''} />
		  </div>
		</HoverCardContent>
	  </HoverCard>
	);
}

export default MovieHoverCard;