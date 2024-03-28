
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

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

	// const streamingRequest = await fetch(`https://apis.justwatch.com/contentpartner/v2/content/offers/object_type/movie/id_type/tmdb/id/${id}/locale/fr_FR?token=${process.env.NEXT_PUBLIC_JUSTWATCH_API_KEY}`);
	// const streaming = await streamingRequest.json();
	// console.log('streaming', streaming);

	return (
		<div>
			<div data-jw-widget
				data-api-key={process.env.NEXT_PUBLIC_JUSTWATCH_API_KEY}
				data-object-type={type}
				data-id={id}
				data-id-type={idType}
				data-max-offers={maxOffer}
				data-theme={theme}
				data-language={locale}
				data-scale="0.8"
			/>
			<div className="text-right">
				<span className="text-sm text-muted-foreground">Powered by{' '}</span>
				<Link
					href={`https://www.justwatch.com/`}
					// href="https://www.justwatch.com/us/movie/the-matrix"
					target="_blank"
					className="inline-flex items-center gap-1"
				>
					<Image
						alt="JustWatch"
						height={11}
						width={70}
						src="https://widget.justwatch.com/assets/JW_logo_color_10px.svg"
					/>
				</Link>
			</div>
			<Script
				id={`justwatch-script-${id}`}
				async
				src="https://widget.justwatch.com/justwatch_widget.js"
				onLoad={() => console.log(`JustWatch widget loaded for ${id}`)}
			/>
		</div>
	)
}