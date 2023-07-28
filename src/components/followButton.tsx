"use client"

import { useQuery, useQueryClient } from "react-query"
import { Button } from "./ui/button"
import { databases } from "@/utils/appwrite"
import { Query } from "appwrite"


interface FollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    followeeId: string
}

export function FollowButton({ className, userId, followeeId }: FollowButtonProps) {

    const queryClient = useQueryClient()
    const { data: follow, isLoading, isError } = useQuery({
        queryKey: ['user', userId, "following", followeeId, "follow"],
        queryFn: () => handleIsUserFollowed(userId, followeeId),
        enabled: userId !== undefined && userId !== null && followeeId !== undefined,
        // staleTime: 30_000
    })



    const handleFollow = async () => {
        follow && handleFollowUser(userId, followeeId, follow)
            .then((res) => {
                queryClient.invalidateQueries(['user', userId, "following", followeeId, "follow"])
            })
            .catch((error) => {
                queryClient.invalidateQueries(['user', userId, "following", followeeId, "follow"])
            })
    }

    async function handleIsUserFollowed(userId: string, followeeId: string) {
        try {
            const response = await (await databases.listDocuments(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
                [
                    Query.equal('followeeId', followeeId),
                    Query.equal('userId', userId)
                ]
            )).documents[0];
            return {
                id: response.$id,
                status: true
            }
        } catch (error) {
            return {
                id: "",
                status: false
            }
        }
    }

    async function handleFollowUser(userId: string, followeeId: string, actualFollowState: { id: string, status: boolean}) {
        if(userId === followeeId) return
        if (actualFollowState.id && actualFollowState.status) {
            await unfollowUser(actualFollowState.id)
            return "unfollow"
    
        } 
        // follow
        else {
            await followUser(userId, followeeId)
            return 'follow'
        }
    }

    async function followUser(userId: string, followeeId: string) {
        try {
            const { status } = await handleIsUserFollowed(userId, followeeId)
            if(status) return
            const {$id} = await databases.createDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER), 
                'unique()', {
                    "followeeId" : followeeId,
                    "userId" : userId,
                }
            )
            return $id
        } catch (error) {
            throw error
        }
    }

    async function unfollowUser(id: string) {
        console.log('id', id)
        try {
            await databases.deleteDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER), 
                id
            )
        } catch (error) {
            console.error("error:", error)
            throw error
        }
    }

    return (
        <Button onClick={handleFollow}>
            {follow?.status ? "Ne plus suivre" : "Suivre"}
        </Button>
    )
}
