"use client"

import Link from "next/link";

// UI
import ButtonShare from "@/components/tools/ButtonShare";
import UserCard from "@/components/User/UserCard/UserCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ICONS
import { BarChart3, Heart } from "lucide-react";
// TYPES
import { Models } from "appwrite";
import { JSONContent } from "@tiptap/react";

// UI
import { Button } from "@/components/ui/button";
import { MovieReviewSettings } from "./MovieReviewSettings";
import { Review } from "@/types/type.review";
import ReviewUser from "./ReviewUser";

export default function MovieReviewOverview({
  review
}: {
  review: Review
}) {

  console.log('review', review)
  return (
    <Link
      href={`/@${review.user.username}/film/${review.film_id}`}
      className="w-full bg-muted px-4 py-2 transition rounded-3xl flex gap-4 justify-between"
    >
      <div className="flex flex-col gap-2">
        <p className='font-semibold line-clamp-1'>
          {review.title}
        </p>
        <div className="flex gap-4 items-center">
          <UserCard user={review.user}/>
          <div className="text-muted-foreground flex items-center gap-2">
            <Heart size={13} className="fill-muted-foreground"/>
            <span>{review.likes_count}</span>
          </div>
        </div>
        {/* BODY */}
        <div className='overflow-hidden text-sm'>
          <Overview data={JSON.parse(review.body)} />
        </div>
      </div>
      <div className="grid grid-cols-1 grid-rows-3 gap-4 shrink-0">
        <div className="flex justify-center items-start">
          <MovieReviewSettings review={review} />
        </div>
        <div className="flex justify-center items-center">
          <ReviewUser rating={review.activity.rating}/>
        </div>
        <div className="flex justify-center items-end">
          <Heart />
        </div>
      </div>
    </Link>
  )
  }

  export function Overview({ data} : { data: JSONContent}) {
    const text = data?.content
      ?.filter((paragraph) => paragraph?.content)
      ?.flatMap((paragraph) => paragraph?.content?.map((item) => item.text).join(''))
      .join('\n');

    return (
      <div className=" whitespace-pre-line text-justify">
        <p className="line-clamp-3">{text}</p>
      </div>
    )
  }