import { ShareControllerProps } from "./ShareController";
import { Media } from "@/types/type.db";
import socialCanvas from "@/lib/social-canvas";
import { useCallback, useEffect, useState } from "react";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

interface ShareControllerMediaProps extends ShareControllerProps {
	media: Media;
}

export const ShareControllerMedia: React.FC<ShareControllerMediaProps> = ({ media, onFileReady }) => {
	const common = useTranslations('common');
	const [isLoading, setIsLoading] = useState(true);
	const [image, setImage] = useState<File | null | undefined>(undefined);
	const [showVoteAverage, setShowVoteAverage] = useState(true);

	const fetchImage = useCallback(async () => {
		try {
			setIsLoading(true);
			if (!media || !media.title || !media.avatar_url) return;
			const body = {
				title: media.title,
				poster: media.avatar_url,
				credits: media.main_credit?.map(c => c.title).join(', '),
				background: media.backdrop_url,
				voteAverage: showVoteAverage ? (media.vote_average ?? media.tmdb_vote_average) : undefined,
			};
	
			const response = await fetch(`${socialCanvas.baseUrl}/media/card`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
	
			if (response.ok) {
				const blob = await response.blob();
				const contentType = response.headers.get('Content-Type') || 'image/png';
				const extension = contentType.split('/')[1];
	
				const file = new File([blob], `${media.title}.${extension}`, { type: contentType });
				setImage(file);
				if (onFileReady) onFileReady(file);
			} else {
				throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
			}
		} catch (error) {
			setImage(null);
		} finally {
			setIsLoading(false);
		}
	}, [media, showVoteAverage, onFileReady]);

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
						alt={media.title ?? 'Media Image'}
						src={URL.createObjectURL(image)}
						className="object-cover h-full rounded-md"
					/>
				) : (
					<p className="text-muted-foreground">{upperFirst(common('errors.an_error_occurred'))}</p>
				)}
			</div>
		</div>
	)
};
