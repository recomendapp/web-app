"use client"
import Tiptap from "@/components/modules/Editor/Editor";
import Loader from "@/components/elements/Loader/Loader";
import { useUser } from "@/context/UserProvider";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import CreateReviewForm from "../../../../../../components/modules/MovieReview/form/CreateReviewFrom";

export default function CreateReview({ params }: { params: { film: string } }) {

    // const { user } = useUser();

    // const router = useRouter();

    // const movieId = params.movie;

    // const {
    //     data: userReview,
    //     isLoading,
    //     isError,
    // } = useQuery({
    //     queryKey: ['movie', movieId, 'review', user?.$id],
    //     queryFn: () => getReviewFromUser(user?.$id, Number(movieId)),
    //     enabled: user?.$id !== undefined && user?.$id !== null,
    // });

    // if(userReview)
    // {
    //     router.push(`/movie/${movieId}/review/${userReview.$id}`);
    //     return ;
    // }
    
    // if (isLoading) {
    //     return <Loader />
    // }

    // return (
    //     <div className="p-4">
    //         <CreateReviewForm movieId={Number(movieId)} user={user}/>
    //     </div>
    // )
}