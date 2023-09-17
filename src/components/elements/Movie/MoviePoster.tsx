import { ImageWithFallback } from "@/components/elements/Tools/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function MoviePoster({ width, poster_path, alt } : { width?: number, poster_path: string, alt: string }) {
    return (
        <div 
            className={`
                shadow-md z-0
                ${width ? `w-[${width}px]` : 'w-full'}
            `}
        >
            <AspectRatio ratio={2 / 3} className="z-0">
                <ImageWithFallback
                src={
                    'https://image.tmdb.org/t/p/original/' + poster_path
                }
                alt={alt}
                fill
                className="rounded-md object-cover z-0"
                />
            </AspectRatio>
        </div>
    )
}