import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Movie } from "@/types/type.db";
import { ImageWithFallback } from "../utils/ImageWithFallback";

interface MovieCardProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		movie: Movie;
	}

const MovieCardDefault = React.forwardRef<
	HTMLDivElement,
	Omit<MovieCardProps, "variant">
>(({ className, movie, children, ...props }, ref) => {
	return (
		<Card
			ref={ref}
			className={cn(
				"flex items-center rounded-xl h-20 bg-muted hover:bg-muted-hover p-1",
				className
			)}
			{...props}
		>
			<div className='relative h-full shrink-0 rounded-md overflow-hidden' style={{ aspectRatio: '2 / 3' }}>
				<ImageWithFallback
					src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : ''}
					alt={movie?.title ?? ''}
					fill
					className="object-cover"
					type="playlist"
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
			</div>
			<div className='px-2 py-1 space-y-1'>
				<p className='line-clamp-2 break-words'>{movie?.title}</p>
				{children}
			</div>
		</Card>
	);
});
MovieCardDefault.displayName = "MovieCardDefault";

const MovieCard = React.forwardRef<
	HTMLDivElement,
	MovieCardProps
>(({ className, variant = "default", ...props }, ref) => {
	switch (variant) {
		case "default":
			return <MovieCardDefault ref={ref} className={className} {...props} />;
		default:
			return null;
	}
});
MovieCard.displayName = "MovieCard";

export {
	type MovieCardProps,
	MovieCard,
	MovieCardDefault,
}