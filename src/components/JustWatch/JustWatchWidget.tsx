"use client"
import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import Link from "next/link"
import { handleGetWatchProviders } from "./hook/handleGetWatchProviders"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageWithFallback } from "@/components/utils/ImageWithFallback"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export async function JustWatchWidget({
	id,
	idType = 'tmdb',
	title,
	year,
	theme = 'dark',
	type = 'movie',
	maxOffer = 4,
} : {
	id: number,
	idType?: string,
	title?: string
	year?: number,
	theme?: string,
	type?: string
	maxOffer?: number
}) {
	const locale = useLocale();
	const country = locale.split('-')[1];
	
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

	// useEffect(() => { 
	// 	const srcUrl = `https://widget.justwatch.com/justwatch_widget.js`;
		
	// 	const s = document.createElement('script');
	// 	const addScript = (src: string) => {
	// 		s.setAttribute('src', src);
	// 		s.setAttribute('async', 'async');
	// 		s.setAttribute('id', `justwatch-widget-${id}`);
	// 		document.body.append(s);
	// 		s.remove();
	// 	};
	// 	addScript(srcUrl);

	// 	return () => {
	// 		// @ts-ignore
	// 		delete window['JustWatch'];
	// 		const script = document.getElementById(`justwatch-widget-${id}`);
	// 		if (script)
	// 			script.remove();
	// 	}
	//   },[id]);
	// get country from local


	return (
		<div>
			{(offers == undefined || isLoading) ? (
				<div className="flex gap-2 overflow-hidden">
					{Array.from({ length: 10 }, (_, index) => (
						<Skeleton key={index} className="h-10 w-10 shrink-0" />
					))}
				</div>
			) : (
				<ScrollArea>
					<div className="flex pb-4">
						{offers[country] ? (
							// delete duplicate provider_id
							// offers[country].filter((v, i, a) => a.findIndex(t => (t.provider_id === v.provider_id)) === i).map((offer, i) => (
							offers[country].map((offer, i) => (
								<Link
									key={i}
									href={offer.link}
									target="_blank"
									className="flex flex-col items-center gap-2 hover:bg-muted rounded-xl p-2 shrink-0"
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
						) : (
							<p className="text-muted-foreground">
								Aucune offre disponible
							</p>
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
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
	)
}