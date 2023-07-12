"use client"

import { useQuery, useQueryClient } from "react-query"
import { Button } from "./ui/button"
import { useFollowUser, useIsUserFollowed } from "@/hooks/follow"


interface FollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    followeeId: string
}

export function FollowButton({ className, userId, followeeId }: FollowButtonProps) {

    const queryClient = useQueryClient()
    const { data: follow, isLoading, isError } = useQuery({
        queryKey: ['user', userId, "following", followeeId, "follow"],
        queryFn: () => useIsUserFollowed(userId, followeeId),
        enabled: userId !== undefined && userId !== null && followeeId !== undefined,
        // staleTime: 30_000
    })

    const handleFollow = async () => {
        follow && useFollowUser(userId, followeeId, follow)
            .then((res) => {
                queryClient.invalidateQueries(['user', userId, "following", followeeId, "follow"])
            })
            .catch((error) => {
                queryClient.invalidateQueries(['user', userId, "following", followeeId, "follow"])
            })
    }

    return (
        <Button onClick={handleFollow}>
            {follow?.status ? "Ne plus suivre" : "Suivre"}
        </Button>
    )
}
