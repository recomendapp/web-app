import { ShareControllerProps } from "./ShareController";
import { Media } from "@/types/type.db";
import socialCanvas from "@/lib/social-canvas";
import { useEffect, useState } from "react";
import { Icons } from "@/config/icons";

interface ShareControllerMediaProps extends ShareControllerProps {
	media: Media;
}

export const ShareControllerMedia: React.FC<ShareControllerMediaProps> = ({ media, onFileReady }) => {
	const [image, setImage] = useState<File | null | undefined>(undefined);

	useEffect(() => {
		const fetchImage = async () => {
			if (!media || !media.title || !media.avatar_url) {
				return;
			}
			const url = new URL('/v1/media/card', socialCanvas.baseUrl);
			url.searchParams.append('title', media.title);
			url.searchParams.append('poster', media.avatar_url);
			if (media.main_credit && media.main_credit.length > 0) {
				url.searchParams.append('credits', media.main_credit.map(credit => credit.title).join(', '));
			}
			if (media.backdrop_url) {
				url.searchParams.append('background', media.backdrop_url);
			}
			const response = await fetch(url.toString());
			if (response.ok) {
				const blob = await response.blob();
				const file = new File([blob], `${media.title}.png`, { type: 'image/png' });
				setImage(file);
				if (onFileReady) {
					onFileReady(file);
				}
			}
		}
		fetchImage();
	}, [media]);

	return (
		<div className="flex flex-col gap-2">
			<div className="relative w-full h-64 flex items-center justify-center">
				{image ? (
					<img
						alt={media.title ?? 'Media Image'}
						src={URL.createObjectURL(image)}
						className="object-cover h-full rounded-md"
					/>
				) : image === null ? (
					<p className="text-muted-foreground">No image available</p>
				) : (
					<Icons.loader />
				)}
			</div>
		</div>
	)
};
