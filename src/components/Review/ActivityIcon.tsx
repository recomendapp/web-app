import { FilmAction } from "@/types/type.film";
import { Text } from "lucide-react";
import { Heart } from "lucide-react";

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    rating?: number;
    is_liked?: boolean;
    is_reviewed?: boolean;
}

export default function ActivityIcon({
    rating,
    is_liked,
    is_reviewed,
} : RatingProps) {

    if (!rating && !is_liked)
        return (null);

    if (!rating && is_liked) {
        return (
            <Heart size={28} className=" shadow-sm text-accent-pink fill-accent-pink"/>
        )
    }

    return (
        <div className="relative bg-accent-1 shadow-sm rounded-full w-7 aspect-square flex justify-center items-center">
            {is_reviewed && 
                <div className="absolute -bottom-2 -left-2 p-0.5 bg-background rounded-full">
                    <Text size={12} className=""/>
                </div>
            }
            <p className="text-accent-1-foreground font-extrabold text-sm">
                {rating}
            </p>
            {is_liked && <Heart size={16} className="absolute -bottom-2 -right-2 text-background fill-accent-pink"/>}
        </div>
    )
}