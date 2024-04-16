import { Button } from "@/components/ui/button";
import { useMap } from "../../../../context/map-context"
import { TriangleAlert, XIcon } from "lucide-react";
import MoviePoster from "@/components/Movie/MoviePoster";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useLocale } from "next-intl";
import Loader from "@/components/Loader/Loader";
import ActivityIcon from "@/components/Review/ActivityIcon";
import { MovieFollowerAverageRating } from "@/app/[lang]/(app)/film/[film]/(default)/_components/MovieFollowerAverageRating";
import { MovieTrailerButton } from "@/app/[lang]/(app)/film/[film]/(default)/_components/MovieHeader";
import Link from "next/link";
import { RuntimeTooltip } from "@/components/utils/RuntimeTooltip";
import { DateOnlyYearTooltip } from "@/components/utils/Date";

export const MovieWidget = () => {
	const {
		movieId,
		setMovieId,
	} = useMap();

	const locale = useLocale();

	const {
		data: movie,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['movie', movieId],
		queryFn: async () => {
			if (!movieId) throw new Error('No movieId');
			const { data: movie, error } = await supabase
				.from('tmdb_movie')
				.select(`
					*,
					data:tmdb_movie_translation(*),
					genres:tmdb_movie_genre(
						id,
						genre:tmdb_genre(
							*,
							data:tmdb_genre_translation(*)
						)
					),
					directors:tmdb_movie_credits(
						id,
						director:tmdb_person(*)
					),
					videos:tmdb_movie_videos(*)
				`)
				.eq('id', movieId)
				.eq('data.language_id', locale)
				.eq('genres.genre.data.language', locale)
				.eq('videos.iso_639_1', locale)
				.eq('directors.job', 'Director')
				.single();
			if (error) throw error;
			console.log('movie', movie);
			return movie;
		},
		enabled: !!movieId && !!locale,
	});

	if (!movieId) return null;

	return (
		<div className="p-2 relative bg-background rounded-md md:max-w-sm w-full max-h-40 h-full pointer-events-auto overflow-hidden overflow-y-scroll">
			<Button
				variant={'ghost'}
				size={'icon'}
				onClick={() => setMovieId(null)}
				className="absolute top-2 right-2 rounded-full w-5 h-5"
			>
				<XIcon className="h-4 w-4"/>
			</Button>
			{isError ? (
				<div className="h-full w-full flex flex-col items-center justify-center">
					<TriangleAlert />
					<>Une erreur s&apos;est produite</>
				</div>
			) : (isLoading || !movie) ? (
				<div className="h-full w-full flex items-center justify-center">
					<Loader />
				</div>
			) : (
				<section className="w-full h-full flex gap-2 items-center">
					<MoviePoster
						className="h-full w-fit"
						poster_path={`https://image.tmdb.org/t/p/w500/${movie.data[0].poster_path}`}
						alt={movie.data[0].title ?? ''}
					>
						{movie.vote_count && (
						<div className='absolute flex flex-col gap-2 top-1 right-1 w-10'>
							<ActivityIcon
								movieId={movie.id}
								rating={movie.vote_average}
								variant="general"
								className="w-full"
								tooltip='Note moyenne'
							/>
							<MovieFollowerAverageRating
							movieId={movie.id}
							className="w-full"
							/>
						</div>
						)}
						{movie?.videos?.length > 0 && (
							<MovieTrailerButton
								videos={movie.videos}
								className="absolute bottom-2 right-2"
							/>
						)}
					</MoviePoster>
					<div className="flex flex-col justify-between w-full h-full">
						{/* TYPE & GENRES */}
						<div className=" line-clamp-1">
						<span className='text-accent-1'>Film</span>
						<span className=" before:content-['_|_']">
							{movie.genres?.map(({ genre } : { genre: any }, index: number) => (
							<span key={genre.id}>
								<Button
									variant="link"
									className="w-fit p-0 h-full font-normal"
									asChild
								>
								<Link href={`/genre/${genre.id}`}>
									{genre.data[0].name}
								</Link>
								</Button>
								{index !== movie.genres?.length! - 1 && (
								<span>, </span>
								)}
							</span>
							))}
						</span>
						</div>
						{/* TITLE */}
						<div className="space-x-1">
							<span className='font-bold text-lg line-clamp-2'>{movie.data[0].title}</span>
							{/* DATE */}
							<sup>
								<DateOnlyYearTooltip date={movie.release_date ?? ''} className=' text-xs font-medium'/>
							</sup>
							{movie.original_title !== movie.data[0].title && (
								<div className='text-xs !ml-0 font-semibold text-muted-foreground line-clamp-1'>{movie.original_title}</div>
							)}
						</div>
						<div className=" space-y-2">
						<div>
							{movie.directors?.map(({ director }, index: number) => (
							<>
								{index > 0 && <span>, </span>}
								<span key={director?.id}>
								<Button
									variant="link"
									className="w-fit p-0 h-full hover:text-accent-1 transition"
									asChild
								>
									<Link href={`/person/${director?.id}`}>
									{director?.name}
									</Link>
								</Button>
								</span>
							</>
							)) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
							{/* RUNTIME */}
							<RuntimeTooltip runtime={movie.runtime ?? 0} className=" before:content-['_•_']" />
						</div>
						{/* <div>
							{movie?.videos?.length > 0 && (
							<MovieTrailerButton videos={movie.videos} />
							)} 
						</div> */}
						</div>
					</div>
				</section>
			)}
			{/* <section className="w-full h-full flex gap-2 items-center">
				<MoviePoster
					className="h-full w-fit"
					poster_path={`https://image.tmdb.org/t/p/w500/${movie.en.poster_path}`}
					alt={movie.en.title}
				/>
				<div>
					<h2 className="text-xl font-bold">
						{movie.en.title}
					</h2>
				</div>

			</section> */}
		</div>
	)
}