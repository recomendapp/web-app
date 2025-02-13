import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useUserActivityQuery } from "@/features/client/user/userQueries";
import { upperFirst } from "lodash";
import { FileEdit } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";

export function MyReviewButton({
	mediaId,
 } : {
	mediaId: number;
}) {
	const common = useTranslations('common');
	const { user } = useAuth();
	const {
	  data: activity,
	  isLoading,  
	} = useUserActivityQuery({
		userId: user?.id,
		mediaId: mediaId,
	});

	if (!user) return;

	if (isLoading || activity === undefined) {
		return (
			<Skeleton className="w-36 h-10 rounded-full"/>
		);
	}
  
	if (!activity?.review) {
		return (
			<Link
			href={`/review/create/${mediaId}`}
			className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
			>
				<FileEdit />
				{upperFirst(common('messages.write_review'))}
			</Link>
		);
	}
  
	return (
		<Link
		href={`/review/${activity?.review?.id}`}
		className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
		>
			<FileEdit />
			{upperFirst(common('messages.my_review', { count: 1 }))}
		</Link>
	);
}
