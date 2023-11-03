import { supabase } from "@/lib/supabase/supabase";
import { Activity } from "@/types/type.feed"
import { FilmWatch } from "@/types/type.film";
import { useQuery } from "react-query";

export function ActivityFilmWatch({
    activity
} : {
    activity: Activity
}) {

    const {
        data: activityContent,
        isLoading: followingLoading,
      } = useQuery({
        queryKey: ['user', activity.user_id, 'activity', activity.activity_id],
        queryFn: async () => {
        //   const { data } = await supabase
          const { data, error } = await supabase
            .rp
          return (data as FilmWatch)
        },
        enabled: activity !== undefined && activity !== null,
      });

    if (!activityContent)
      return (null)

    return (
        <div>
            {activity.user.username} a vu le film {activityContent?.film_id}
        </div>
    )
}