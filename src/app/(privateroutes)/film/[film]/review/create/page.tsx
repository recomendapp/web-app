"use client"
import Tiptap from "@/components/modules/Editor/Editor";
import Loader from "@/components/elements/Loader/Loader";
import { useUser } from "@/context/UserProvider";
import { JSONContent } from "@tiptap/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import CreateReviewForm from "../../../../../../components/modules/Review/form/CreateReviewFrom";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useQuery } from "@apollo/client";
import USER_REVIEW_QUERY from "@/components/modules/Review/queries/userReviewQuery";

export default function CreateReview({ params }: { params: { film: string } }) {

    const { user } = useAuth();

    const { data: userReviewQuery, loading } = useQuery(USER_REVIEW_QUERY, {
        variables: {
            fim_id: params.film,
            user_id: user?.id
        },
        skip: !user?.id
    })
    const review = userReviewQuery?.reviewCollection?.edges[0]?.review

    if (!user || loading) {
        return <Loader />
    }

    if(review)
        redirect(`/@${user.username}/film/${params.film}`);
    
    return (
        <div className="p-4">
            <CreateReviewForm filmId={params.film} user={user}/>
        </div>
    )
}