import { Activity as ActivityType } from "@/types/type.feed"
import { ActivityFilmWatch } from "../components/ActivityFilmWatch";
import { ActivityFollower } from "../components/ActivityFollower";

type ActivityComponentType = {
    [key: string]: React.ComponentType<{ activity: ActivityType }>;
};

const ActivityComponents: ActivityComponentType  = {
    follower: ActivityFollower,
    film_watch: ActivityFilmWatch,
};

export function Activity({
    activity
} : {
    activity: ActivityType
}) {

    const ActivityComponent = ActivityComponents[activity.table];

    if (!ActivityComponent)
        return (null);

    return (<ActivityComponent activity={activity} />)
}