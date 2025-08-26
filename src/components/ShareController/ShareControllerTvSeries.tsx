"use client";
import { ShareControllerProps } from "./ShareController";
import { MediaTvSeries } from "@recomendapp/types/dist";
import { useCallback, useEffect, useState } from "react";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { getSocialCanvas } from "@/lib/social-canvas";

interface ShareControllerTvSeriesProps extends ShareControllerProps {
	tvSeries: MediaTvSeries;
}

export const ShareControllerTvSeries: React.FC<ShareControllerTvSeriesProps> = ({ tvSeries, onFileReady }) => {
	const common = useTranslations('common');
	const [isLoading, setIsLoading] = useState(true);
	const [image, setImage] = useState<File | null | undefined>(undefined);
	const [showVoteAverage, setShowVoteAverage] = useState(true);

	const fetchImage = useCallback(async () => {
		try {
			setIsLoading(true);
			if (!tvSeries || !tvSeries.name || !tvSeries.poster_url) return;
			const body = {
				title: tvSeries.name,
				poster: tvSeries.poster_url,
				credits: tvSeries.created_by?.map(c => c.name).join(', '),
				background: tvSeries.backdrop_url,
				voteAverage: showVoteAverage && tvSeries.vote_average ? tvSeries.vote_average : undefined,
			};
	
			const { buffer, contentType } = await getSocialCanvas({
				endpoint: '/media/card',
				body: JSON.stringify(body),
			});
			if (!buffer || !contentType) {
				throw new Error('Invalid response from Social Canvas');
			}
			const extension = contentType.split('/')[1];
			const file = new File([buffer], `${tvSeries.name}.${extension}`, { type: contentType });
			setImage(file);
			onFileReady?.(file);
		} catch (error) {
			setImage(null);
		} finally {
			setIsLoading(false);
		}
	}, [tvSeries, showVoteAverage, onFileReady]);

	useEffect(() => {
		fetchImage();
	}, [fetchImage]);

	return (
		<div className="w-full flex flex-col items-center gap-2">
			<div className="w-full p-2 bg-muted rounded-md grid grid-cols-2 gap-2">
				<div className="flex items-center gap-2">
					<Switch id="vote-average" checked={showVoteAverage} onCheckedChange={setShowVoteAverage} />
					<Label htmlFor="vote-average">{upperFirst(common('messages.vote_average'))}</Label>
				</div>
			</div>
			<div className="relative w-full h-64 flex items-center justify-center">
				{isLoading ? (
					<Skeleton className="aspect-[2/3] h-full rounded-md" />
				) : image ? (
					<img
						alt={tvSeries.name ?? 'tvSeries Image'}
						src={URL.createObjectURL(image)}
						className="object-cover h-full rounded-md"
					/>
				) : (
					<p className="text-muted-foreground">{upperFirst(common('messages.an_error_occurred'))}</p>
				)}
			</div>
		</div>
	)
};
