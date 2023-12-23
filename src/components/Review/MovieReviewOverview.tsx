"use client"

import Link from "next/link";

// UI
import ButtonShare from "@/components/utils/ButtonShare";
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
import { FilmAction } from "@/types/type.film";
import { cn } from "@/lib/utils";
import Rating from "./ActivityIcon";

export default function MovieReviewOverview({
  review,
  activity,
  className,
}: {
  review: Review,
  activity: FilmAction,
  className?: string,
}) {
  return (
    <Link
      href={`/@${review.user.username}/film/${review.film_id}`}
      className={cn("w-full bg-muted px-4 py-2 transition rounded-3xl flex flex-col gap-2", className)}
    >
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <Rating rating={activity.rating} is_liked={activity.is_liked}/>
            <p className='font-semibold line-clamp-1'>
              {review.title}
            </p>
          </div>
          <div className="flex justify-center items-start">
            <MovieReviewSettings review={review} />
          </div>
        </div>
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
        <div className="text-right">
          ACTION
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