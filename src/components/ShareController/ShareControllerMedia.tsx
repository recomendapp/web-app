import { ShareControllerProps } from "./ShareController";
import { Media } from "@/types/type.db";
import socialCanvas from "@/lib/social-canvas";

interface ShareControllerMediaProps extends ShareControllerProps {
	media: Media;
}

export const ShareControllerMedia: React.FC<ShareControllerMediaProps> = ({ media, onFileReady }) => {
	if (!media || !media.title || !media.avatar_url) {
		return null;
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
	return (
		<div className="flex flex-col gap-2">
			<img
			alt={media.title}
			src={url.toString()}
			className="object-cover w-full h-64 rounded-md"
			onLoad={(e) => {
				const file = new File([e.currentTarget.src], `${media.title}.png`, { type: 'image/png' });
				if (onFileReady) {
					onFileReady(file);
				}
			}}
			/>
		</div>
	)
};
