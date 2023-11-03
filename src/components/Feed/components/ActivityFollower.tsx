import { Activity } from "@/types/type.feed"

export function ActivityFollower({
    activity
} : {
    activity: Activity
}) {

    return (
        <div>
            {activity.user.full_name}: {activity.id}
        </div>
    )
}