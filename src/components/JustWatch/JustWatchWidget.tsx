"use client"
import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import Link from "next/link"
import { handleGetWatchProviders } from "./hook/handleGetWatchProviders"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageWithFallback } from "@/components/utils/ImageWithFallback"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// UI
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { EyeIcon } from "lucide-react"
import Loader from "../Loader/Loader"

export function JustWatchWidget({
	id,
	idType = 'tmdb',
	title,
	year,
	theme = 'dark',
	type = 'movie',
	maxOffer = 4,
	className,
} : {
	id: number,
	idType?: string,
	title?: string
	year?: number,
	theme?: string,
	type?: string,
	maxOffer?: number,
	className?: string,
}) {
	const locale = useLocale();
	// country in upper case
	const country = locale.toUpperCase() === 'FR' ? 'FR' : 'US';
	const [open, setOpen] = useState(false);
	
	const {
		data: offers,
		isLoading
	} = useQuery({
		queryKey: ['movie', id, 'justwatch'],
		queryFn: async () => {
			const results = await handleGetWatchProviders(id);
			return results;
		},
		enabled: !!id,
	});

	const flatrateOffers = offers?.[country]?.filter((offer: any) => offer.types.includes('flatrate'));
	const rentOffers = offers?.[country]?.filter((offer: any) => offer.types.includes('rent'));
	const buyOffers = offers?.[country]?.filter((offer: any) => offer.types.includes('buy'));

	return (
		<>
			<div className={cn('', className)}>
				<div
					className="clickable group text-lg font-medium"
					onClick={() => setOpen(true)}
				>
					Voir le film
					<EyeIcon size={15} className="inline-block ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
				</div>
				<div className="@container/justwatch">
					{(offers == undefined || isLoading) ? (
						<Skeleton className="w-full h-20"/>
					) : offers[country] ? (
						<div
							className={`
								overflow-hidden gap-2
								columns-4 @sm/justwatch:columns-6 @lg/justwatch:columns-8 @xl/justwatch:columns-10  @3xl/justwatch:columns-12
							`}>
							{(offers[country].map((offer, i) => (
									<Link
										key={i}
										href={offer.link}
										target="_blank"
										className="flex flex-col items-center gap-2 hover:bg-muted rounded-md p-2 shrink-0 break-after-column"
									>
										<ImageWithFallback
											alt={offer.provider_id}
											height={40}
											width={40}
											src={`https://image.tmdb.org/t/p/original/${offer.logo_path}`}
											className="rounded-md"
											type="watch-provider"
										/>
										<div className="flex flex-col space-x-1">
											<span className="text-sm bg-muted rounded-sm px-1 text-muted-foreground">
												{offer.types[0]}
											</span>
										</div>
										{/* <div className="flex  flex-col space-x-1">
											{offer.types.map((type: string, idx: number) => (
												<span key={idx} className="text-sm bg-muted rounded-sm px-1 text-muted-foreground">{type}</span>
											))}
										</div> */}
									</Link>
								))
							)}
						</div>
					) : (
						<p className="text-muted-foreground">
							Aucune offre disponible
						</p>
					)}
					<div className="text-right">
						<span className="text-sm text-muted-foreground">Powered by{' '}</span>
						<Link
							href={`https://www.justwatch.com/`}
							// href="https://www.justwatch.com/us/movie/the-matrix"
							target="_blank"
							className="inline-flex items-center gap-1"
						>
							<ImageWithFallback
								alt="JustWatch"
								height={11}
								width={70}
								src="https://widget.justwatch.com/assets/JW_logo_color_10px.svg"
							/>
						</Link>
					</div>
				</div>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className=" @container/justwatch-modal">
					<DialogHeader>
						<DialogTitle>Regarder {title}</DialogTitle>
						<DialogDescription>
							Retrouvez les offres pour regarder {title} en streaming, achat et location.
						</DialogDescription>
					</DialogHeader>
					{(offers == undefined || isLoading) ? (
						<Loader />
					) : offers[country] ? (
						<>
							{/* Show flatrate */}
							{flatrateOffers && flatrateOffers.length > 0 && (
								<div>
									<h3 className="text-lg font-medium">Streaming</h3>
									<div className={`grid gap-2
										grid-cols-5 @sm/justwatch-modal:grid-cols-6 @lg/justwatch-modal:grid-cols-8 @xl/justwatch-modal:grid-cols-10 @3xl/justwatch-modal:grid-cols-12
									`}>
										{flatrateOffers.map((offer: any, i: number) => (
											<Link
												key={i}
												href={offer.link}
												target="_blank"
												className="hover:bg-muted rounded-xl p-2 shrink-0 w-fit"
											>
												<ImageWithFallback
													alt={offer.provider_id}
													height={40}
													width={40}
													src={`https://image.tmdb.org/t/p/original/${offer.logo_path}`}
													className="rounded-md"
													type="watch-provider"
												/>
											</Link>
										))}
									</div>
								</div>
							)}
							{/* Show rent */}
							{rentOffers && rentOffers.length > 0 && (
								<div>
									<h3 className="text-lg font-medium">Location</h3>
									<div className={`grid gap-2
										grid-cols-5 @sm/justwatch-modal:grid-cols-6 @lg/justwatch-modal:grid-cols-8 @xl/justwatch-modal:grid-cols-10 @3xl/justwatch-modal:grid-cols-12
									`}>
										{rentOffers.map((offer: any, i: number) => (
											<Link
												key={i}
												href={offer.link}
												target="_blank"
												className="hover:bg-muted rounded-xl p-2 shrink-0 w-fit"
											>
												<ImageWithFallback
													alt={offer.provider_id}
													height={40}
													width={40}
													src={`https://image.tmdb.org/t/p/original/${offer.logo_path}`}
													className="rounded-md"
													type="watch-provider"
												/>
											</Link>
										))}
									</div>
								</div>
							)}
							{/* Show buy */}
							{buyOffers && buyOffers.length > 0 && (
								<div>
									<h3 className="text-lg font-medium">Achat</h3>
									<div className={`grid gap-2
										grid-cols-5 @sm/justwatch-modal:grid-cols-6 @lg/justwatch-modal:grid-cols-8 @xl/justwatch-modal:grid-cols-10 @3xl/justwatch-modal:grid-cols-12
									`}>
										{buyOffers.map((offer: any, i: number) => (
											<Link
												key={i}
												href={offer.link}
												target="_blank"
												className="hover:bg-muted rounded-xl p-2 shrink-0 w-fit"
											>
												<ImageWithFallback
													alt={offer.provider_id}
													height={40}
													width={40}
													src={`https://image.tmdb.org/t/p/original/${offer.logo_path}`}
													className="rounded-md"
													type="watch-provider"
												/>
											</Link>
										))}
									</div>
								</div>
							)}
						</>
					) : (
						<p className="text-muted-foreground">
							Aucune offre disponible
						</p>
					)}
					<DialogFooter>
					</DialogFooter>
				</DialogContent>
				</Dialog>
		</>
	)
}