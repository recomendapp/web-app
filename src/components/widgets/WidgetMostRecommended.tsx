"use client"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPlayPause,
	CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "@/lib/i18n/routing";
import { DateOnlyYearTooltip } from "../utils/Date";
import { SendIcon } from "lucide-react";
import { useModal } from "@/context/modal-context";
import Autoplay from "embla-carousel-autoplay"
import { useRef, useState } from "react";
import { TooltipBox } from "../Box/TooltipBox";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useTranslations } from "next-intl";
import { useWidgetMostRecommendedQuery } from "@/features/client/widget/widgetQueries";
import { BadgeMedia } from "../Badge/BadgeMedia";
import Image from "next/image";
import { upperFirst } from "lodash";
import { ModalUserRecosMovieSend } from "../Modals/recos/ModalUserRecosMovieSend";
import { ModalUserRecosTvSeriesSend } from "../Modals/recos/ModalUserRecosTvSeriesSend";

interface WidgetMostRecommendedProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetMostRecommended = ({
	className,
} : WidgetMostRecommendedProps) => {
	const { session } = useAuth();
	const { openModal } = useModal();
	const t = useTranslations('common');
	const {
		data,
		isLoading,
		isError
	} = useWidgetMostRecommendedQuery();
	const [isPlaying, setIsPlaying] = useState(true);
	const autoplay = useRef(
		Autoplay({
			delay: 8000,
		})
	)

	if (data === undefined || isLoading) {
		return <Skeleton className={cn("w-full h-80", className)} />
	}
	
	if (!data.length || isError) return null;
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
			{data.map(({media_id, media, recommendation_count}, index) => {
				if (!media) return null;
				return (
				<CarouselItem key={index}>
					<>
						<Card className="relative bg-black/40 flex flex-col h-full justify-between gap-2">
							{media?.backdrop_url && (
								<Image
									src={media.backdrop_url}
									alt={media.title ?? ''}
									fill
									className="object-cover -z-10"
									sizes={`
									(max-width: 640px) 640px,
									(max-width: 1024px) 800px,
									1280px
									`}
								/>
							)}
							<CardHeader className="flex-row justify-between items-center gap-2 text-xl font-semibold leading-none tracking-tight ">
								<h3 className="text-xl">
									{upperFirst(t('messages.most_recommended', { count: 0 }))}
								</h3>
								<div className="flex flex-col items-end gap-2">
									<div># {index + 1}</div>
									<BadgeMedia type={media.media_type} />
								</div>
							</CardHeader>
							<CardContent>
								<Link href={media.url ?? ''} className="w-fit text-clamp-title line-clamp-2 font-semibold">
									{media?.title}
									<sup className="ml-2">
										<DateOnlyYearTooltip date={media.date ?? ''} className="text-base font-medium" />
									</sup>
								</Link>
								{media.genres ? <div>
									{media?.genres?.map((genre, index: number) => (
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
										{index !== media.genres?.length! - 1 && (
										<span>, </span>
										)}
									</span>
									))}
								</div> : null}
								{("overview" in media?.extra_data && media.extra_data.overview) && (
									<div className="max-w-xl line-clamp-2 pt-2">
										{media.extra_data.overview}
									</div>
								)}
							</CardContent>
							<CardFooter className="flex items-center gap-2">
								{session && <TooltipBox tooltip={session ? 'Envoyer à un(e) ami(e)' : undefined}>
									<Button
									size={"icon"}
									variant={"muted"}
									className="bg-muted/60"
									onClick={() => {
										if (media) {
											switch (media.media_type) {
												case 'movie':
													openModal(ModalUserRecosMovieSend, { movieId: media_id!, movieTitle: media.title })
													break;
												case 'tv_series':
													openModal(ModalUserRecosTvSeriesSend, { tvSeriesId: media_id!, tvSeriesTitle: media.title })
													break;
											}
										}
									}}>
										<SendIcon className="w-4 h-4 fill-primary" />
									</Button>
								</TooltipBox>}
								{recommendation_count} reco{Number(recommendation_count) > 1 ? 's' : ''}
							</CardFooter>
						</Card>
					</>
				</CarouselItem>
				)
			})}
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