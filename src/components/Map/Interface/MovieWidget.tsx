import { Button } from "@/components/ui/button";
import { useMap } from "../../../context/map-context"
import { TriangleAlert, XIcon } from "lucide-react";
import MediaPoster from "@/components/Media/MediaPoster";
import { useLocale } from "next-intl";
import Loader from "@/components/Loader";
import { MovieTrailerButton } from "@/app/[lang]/(app)/film/[film_id]/(default)/_components/MovieHeader";
import { Link } from "@/lib/i18n/routing";
import { RuntimeTooltip } from "@/components/utils/RuntimeTooltip";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { useMediaMovieDetailsQuery } from "@/features/client/media/mediaQueries";
import { IconMediaRating } from "@/components/Media/icons/IconMediaRating";
import MediaActionUserActivityRating from "@/components/Media/actions/MediaActionUserActivityRating";
import MediaActionUserActivityLike from "@/components/Media/actions/MediaActionUserActivityLike";
import MediaActionUserActivityWatch from "@/components/Media/actions/MediaActionUserActivityWatch";
import MediaActionUserWatchlist from "@/components/Media/actions/MediaActionUserWatchlist";
import MediaActionUserActivityWatchedDate from "@/components/Media/actions/MediaActionUserActivityWatchedDate";
import MediaActionPlaylistAdd from "@/components/Media/actions/MediaActionPlaylistAdd";
import MediaActionUserRecos from "@/components/Media/actions/MediaActionUserRecos";

export const MovieWidget = () => {
	const {
		selectedMovie,
		setSelectedMovie,
	} = useMap();

	const locale = useLocale();

	const {
		data: movie,
		isLoading,
		isError,
	} = useMediaMovieDetailsQuery({
		id: selectedMovie?.movie.id,
		locale: locale as string,
	});

	if (!selectedMovie?.movie.id) return null;

	return (
		<div className="p-2 relative bg-background rounded-md md:max-w-sm w-full max-h-48 md:max-h-52 h-full pointer-events-auto overflow-hidden overflow-y-scroll">
			<Button
				variant={'ghost'}
				size={'icon'}
				onClick={() => setSelectedMovie(null)}
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
				<div className="w-full h-full flex flex-col gap-2">
					<div className="w-full h-full flex gap-2 items-center">
						<MediaPoster
							className="h-full w-fit"
							src={movie.avatar_url ?? ''}
							alt={movie.title ?? ''}
							width={96}
							height={144}
						>
							{movie.vote_count && (
							<div className='absolute flex flex-col gap-2 top-1 right-1 w-10'>
								{movie.vote_average ? <IconMediaRating
									rating={movie.vote_average}
									variant="general"
									className="w-full"
								/> : null}
								{movie.follower_avg_rating ? <IconMediaRating
									rating={movie.follower_avg_rating}
									variant="follower"
									className="w-full"
								/> : null}
							</div>
							)}
							{movie?.videos?.length > 0 && (
								<MovieTrailerButton
									videos={movie.videos}
									className="absolute bottom-2 right-2"
								/>
							)}
						</MediaPoster>
						<div className="flex flex-col justify-between w-full h-full">
							{/* TYPE & GENRES */}
							<div className=" line-clamp-1">
							<span className='text-accent-yellow'>Film</span>
							<span className=" before:content-['_|_']">
								{movie.genres?.map((genre: any, index: number) => (
								<span key={index}>
									<Button
										variant="link"
										className="w-fit p-0 h-full font-normal"
										asChild
									>
									<Link href={`/genre/${genre.id}`}>
										{genre.name}
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
								<Link
									href={`/film/${movie.id}`}
									className='font-bold text-lg line-clamp-2'
								>
									{movie.title}
								</Link>
								{/* DATE */}
								<sup>
									<DateOnlyYearTooltip date={movie.date ?? ''} className=' text-xs font-medium'/>
								</sup>
								{movie.extra_data.original_title !== movie.title && (
									<div className='text-xs !ml-0 font-semibold text-muted-foreground line-clamp-1'>{movie.extra_data.original_title}</div>
								)}
							</div>
							<div className=" space-y-2">
							<div className="line-clamp-1">
								{movie.main_credit?.map((person, index) => (
								<>
									{index > 0 && <span>, </span>}
									<span key={index}>
										<Button
											variant="link"
											className="w-fit p-0 h-full hover:text-accent-yellow transition"
											asChild
										>
											<Link href={person.url ?? ''}>
											{person?.title}
											</Link>
										</Button>
									</span>
								</>
								)) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
								{/* RUNTIME */}
								<RuntimeTooltip runtime={movie.extra_data.runtime ?? 0} className=" before:content-['_•_']" />
							</div>
							{/* <div>
								{movie?.videos?.length > 0 && (
								<MovieTrailerButton videos={movie.videos} />
								)} 
							</div> */}
							</div>
						</div>
					</div>
					<div className="flex justify-between gap-2 px-4 pb-4">
						<div className="flex gap-2 overflow-x-auto items-center">
						<MediaActionUserActivityRating mediaId={movie.media_id!} />
						<MediaActionUserActivityLike mediaId={movie.media_id!} />
						<MediaActionUserActivityWatch mediaId={movie.media_id!} />
						<MediaActionUserWatchlist mediaId={movie.media_id!} />
						<MediaActionUserActivityWatchedDate mediaId={movie.media_id!} />
						</div>
						<div className="flex gap-2 items-center">
						<MediaActionPlaylistAdd mediaId={movie.media_id!} mediaTitle={movie.title} />
						<MediaActionUserRecos mediaId={movie.media_id!} mediaTitle={movie.title} />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}