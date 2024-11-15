"use client"
import { set } from "lodash"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect, useState } from "react"
import { any } from "zod"

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

	return (
		<div className="p-2">
			<div data-jw-widget
				data-api-key={process.env.NEXT_PUBLIC_JUSTWATCH_API_KEY}
				data-object-type={type}
				data-id={id}
				data-id-type={idType}
				data-max-offers={maxOffer}
				data-theme={'dark'}
				data-language={locale}
				data-scale="0.8"
			/>
			{/* <div className="text-right">
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
			</div> */}
			<script async src="https://widget.justwatch.com/justwatch_widget.js"></script>
		</div>
	)
}