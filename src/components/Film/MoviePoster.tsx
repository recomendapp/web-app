"use client"

import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

export default function MoviePoster({
    className,
    poster_path,
    alt
} : {
    className?: string,
    poster_path: string,
    alt: string
}) {
    return (
        <div 
            className={cn("shadow-md z-0 relative shrink-0 w-full aspect-[2/3]", className)}
        >
            {/* <AspectRatio ratio={2 / 3} className="z-0"> */}
                <ImageWithFallback
                    src={poster_path}
                    alt={alt}
                    fill
                    className="rounded-md object-cover z-0"
                />
            {/* </AspectRatio> */}
        </div>
    )
}