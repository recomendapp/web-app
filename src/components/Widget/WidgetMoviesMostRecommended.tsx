"use client"

import { useMovieMostRecommended } from "@/features/movie/movieQueries";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPlayPause,
	CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { DateOnlyYearTooltip } from "../utils/Date";
import { SendIcon } from "lucide-react";
import { MovieSendModal } from "../Modals/Movie/Actions/MovieSendModal";
import { useModal } from "@/context/modal-context";
import Autoplay from "embla-carousel-autoplay"
import { useRef, useState } from "react";
import { TooltipBox } from "../Box/TooltipBox";
import { cn } from "@/lib/utils";

interface WidgetMoviesMostRecommendedProps extends React.HTMLAttributes<HTMLDivElement> {
	isLogged: boolean;
}

export const WidgetMoviesMostRecommended = ({
	isLogged,
	className,
} : WidgetMoviesMostRecommendedProps) => {
	const { openModal } = useModal();
	const { data, error, isLoading } = useMovieMostRecommended();
	const [isPlaying, setIsPlaying] = useState(true);
	const autoplay = useRef(
		Autoplay({
			delay: 8000,
		})
	)
	if (!data) return null;
	return (
	<Carousel
	opts={{
		loop: true,
	}}
	className={cn("w-full", className)}
	plugins={[autoplay.current]}
	onMouseEnter={autoplay.current.stop}
	onMouseLeave={() => isPlaying && autoplay.current.play()}
	>
		<CarouselContent>
			{data.map(({movie, recommendation_count}, index) => (
			<CarouselItem
			key={index}
			>
				<div
				style={{
					backgroundImage: movie?.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` : 'none',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
				className="rounded-xl h-full"
				>
					<Card className="bg-black bg-opacity-40 flex flex-col h-full justify-between gap-2">
						<CardHeader>
							<CardTitle className="flex justify-between items-center gap-2 text-xl">
								<h3>Les plus recommandés.</h3>
								<div># {index + 1}</div>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Link href={`/film/${movie?.id}`} className="text-white text-clamp-title font-semibold">
								{movie?.title}
								<sup className="ml-2">
									<DateOnlyYearTooltip date={movie?.release_date ?? ''} className="text-base font-medium" />
								</sup>
							</Link>
							<div>
								{movie?.genres?.map((genre: any, index: number) => (
								<span key={genre.id}>
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
							</div>
							{/* OVERVIEW */}
							{movie?.overview ? <div className="max-w-xl line-clamp-2 pt-2">
								{movie.overview}
							</div> : null}
						</CardContent>
						<CardFooter className="flex items-center gap-2">
							<TooltipBox tooltip={isLogged ? 'Envoyer à un(e) ami(e)' : undefined}>
								<Button
								size={"icon"}
								variant={"muted"}
								className="bg-muted/60"
								onClick={() => (isLogged && movie) && openModal(MovieSendModal, { movieId: movie?.id })}
								>
									<SendIcon className="w-4 h-4 fill-primary" />
								</Button>
							</TooltipBox>
							{recommendation_count} reco{Number(recommendation_count) > 1 ? 's' : ''}
						</CardFooter>
					</Card>
				</div>
			</CarouselItem>
			))}
		</CarouselContent>
		<div className="absolute bottom-6 right-2 flex gap-2">
			<CarouselPlayPause
			autoplay={autoplay.current}
			className="static left-auto top-auto translate-y-0"
			isPlaylistCallback={(e) => setIsPlaying(e)}
			/>
			<CarouselPrevious className="static left-auto top-auto translate-y-0"/>
			<CarouselNext className="static right-auto top-auto translate-y-0"/>
		</div>
	</Carousel>
	);
}