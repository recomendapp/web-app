import { ImageWithFallback } from "@/components/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function MoviePoster({ width, poster_path, alt } : { width: number, poster_path: string, alt: string }) {
    return (
        <div 
            className={`
                shadow-md
                w-[${width}px]
            `}
        >
            <AspectRatio ratio={2 / 3}>
                <ImageWithFallback
                src={
                    'https://image.tmdb.org/t/p/original/' + poster_path
                }
                alt={alt}
                fill
                className="rounded-md object-cover"
                />
            </AspectRatio>
        </div>
    )
}