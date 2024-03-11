import UserCard from "@/components/User/UserCard/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedActivity } from "./FeedActivity";

const FeedItem = ({ activity }: { activity?: any }) => {
	if (!activity) {
	  return (
		<Skeleton className="flex bg-secondary h-full rounded-xl p-2 gap-2">
		  <Skeleton className="bg-background h-[25px] w-[25px] rounded-full" />
		  <Skeleton className="bg-background h-5 w-20" />
		  <Skeleton className="bg-background h-5 w-20 rounded-full" />
		</Skeleton>
	  );
	}

	return (
	  <div
		className="flex items-start gap-2 bg-muted rounded-xl p-2"
	  >
		<UserCard user={activity.user} icon />
		<FeedActivity activity={activity} />
	  </div>
	);
};

export default FeedItem;