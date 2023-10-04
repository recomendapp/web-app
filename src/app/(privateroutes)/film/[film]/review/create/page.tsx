"use client"
import Loader from "@/components/Loader/Loader";
import { redirect } from "next/navigation";
import CreateReviewForm from "../../../../../../components/Review/form/CreateReviewFrom";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useQuery } from "@apollo/client";
import USER_REVIEW_QUERY from "@/components/Review/queries/userReviewQuery";

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