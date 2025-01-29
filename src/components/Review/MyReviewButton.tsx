import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useUserActivityQuery } from "@/features/client/user/userQueries";
import { getMediaDetails, getMediaUrl } from "@/hooks/get-media-details";
import { MediaType } from "@/types/type.db";
import { upperFirst } from "lodash";
import { FileEdit } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function MyReviewButton({
	mediaId,
	mediaType,
	mediaSlug,
 } : {
	mediaId: number;
	mediaType: MediaType;
	mediaSlug?: string;
}) {
	const common = useTranslations('common');
	const { user } = useAuth();
	const {
	  data: activity,
	  isLoading,  
	} = useUserActivityQuery({
		userId: user?.id,
		mediaId: mediaId,
		mediaType: mediaType,
	});
	const mediaUrl = getMediaUrl({ id: mediaId, type: mediaType, slug: mediaSlug });
  
	if (!user) return;

	if (isLoading || activity === undefined) {
		return (
			<Skeleton className="w-36 h-10 rounded-full"/>
		);
	}
  
	if (!activity?.review) {
		return (
			<Link
			href={`${mediaUrl}/review/create/`}
			className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
			>
				<FileEdit />
				{upperFirst(common('messages.write_review'))}
			</Link>
		);
	}
  
	return (
		<Link
		href={`${mediaUrl}/review/${activity?.review?.id}`}
		className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
		>
			<FileEdit />
			{upperFirst(common('messages.my_review', { count: 1 }))}
		</Link>
	);
}
