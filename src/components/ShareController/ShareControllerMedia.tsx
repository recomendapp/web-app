import { ShareControllerProps } from "./ShareController";
import { Media } from "@/types/type.db";
import socialCanvas from "@/lib/social-canvas";
import { useEffect, useState } from "react";
import { Icons } from "@/config/icons";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

interface ShareControllerMediaProps extends ShareControllerProps {
	media: Media;
}

export const ShareControllerMedia: React.FC<ShareControllerMediaProps> = ({ media, onFileReady }) => {
	const common = useTranslations('common');
	const [image, setImage] = useState<File | null | undefined>(undefined);

	useEffect(() => {
		const fetchImage = async () => {
			if (!media || !media.title || !media.avatar_url) return;
			const body = {
				title: media.title,
				poster: media.avatar_url,
				credits: media.main_credit?.map(c => c.title).join(', '),
				background: media.backdrop_url,
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
				const file = new File([blob], `${media.title}.png`, { type: 'image/png' });
				setImage(file);
				if (onFileReady) onFileReady(file);
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
					<p className="text-muted-foreground">{upperFirst(common('errors.an_error_occurred'))}</p>
				) : (
					<Icons.loader />
				)}
			</div>
		</div>
	)
};
