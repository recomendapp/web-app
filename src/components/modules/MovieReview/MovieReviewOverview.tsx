"use client"

import Link from "next/link";

// UI
import ButtonShare from "@/components/elements/ButtonShare/ButtonShare";
import UserCard from "@/components/elements/UserCard/UserCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ICONS
import { BarChart3, Heart } from "lucide-react";
// TYPES
import { Models } from "appwrite";
import { JSONContent } from "@tiptap/react";

// UI
import { Button } from "@/components/ui/button";
import { MovieReviewSettings } from "./MovieReviewSettings";

export default function MovieReviewOverview({ review }: { review: Models.Document}) {
    return (
      // <Link href={`/movie/${review.movieId}/review/${review.$id}`} className="relative">
      <div className="relative">  
        {/* RATING */}
        <div className="absolute bg-background border-2 border-accent-1 rounded-xl h-10 w-12 flex justify-center items-center">
          <p className="text-accent-1 font-bold text-lg">
            {review.movie_rating}
          </p>
        </div>
        <div className=" pt-2 pl-5">
          <div className='border-2 w-full bg-accent-1-foreground transition px-10 py-4 rounded-3xl flex flex-col'>
            {/* REVIEW */}
            <div className="flex flex-col gap-2">
              {/* TITLE */}
              <div className="flex items-center justify-between gap-4">
                {review.title && <p className='text-xl font-semibold text-accent-1 truncate'>
                    {review.title}
                </p>}
                <div className="flex items-center gap-2">
                  {review.movie_liked && <Heart className="text-like fill-like"/>}
                  <MovieReviewSettings review={review} />
                </div>
              </div>
              {/* BODY */}
              <div className='h-[85px] overflow-hidden'>
                <Overview data={JSON.parse(review.body)} />
              </div>
            </div>
            {/* LINK */}
            <Button variant="link" asChild className="w-fit p-0 font-bold">
              <Link href={`/movie/${review.movieId}/review/${review.$id}`}>
                Lire la critique
              </Link>
            </Button>

            {/* FOOTER */}
            <div className="flex justify-between">
              {/* REACTIONS */}
              <div className=" flex items-center gap-4">
                <span className='flex items-center gap-1'>
                  <Heart className="text-like" />
                  {review.likes_count ? review.likes_count : 0}
                </span>
                <span className='flex items-center gap-1'>
                  <BarChart3 color="#03fcf0"/>
                  {review.views_count ? review.views_count : 0}
                </span>
                <ButtonShare url={`${process.env.NEXT_PUBLIC_URL}/movie/${review.movieId}/review/${review.$id}`} icon />
              </div>
              {/* AUTHOR */}
              <UserCard user={review.user}/>
            </div>
          </div>
        </div>
      </div>
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