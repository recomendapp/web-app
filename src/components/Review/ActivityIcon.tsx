import { cn } from '@/lib/utils';
import { Text } from 'lucide-react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
  rating?: number | null;
  is_liked?: boolean | null;
  is_reviewed?: number | null;
  className?: string;
}

export default function ActivityIcon({
  movieId,
  rating,
  is_liked,
  is_reviewed,
  className,
}: RatingProps) {
  if (!rating) return null;

  // if (!rating && !is_liked) return null;

  // if (!rating && is_liked) {
  //   return (
  //     <Heart
  //       size={15}
  //       className="shadow-sm text-background fill-accent-pink"
  //     />
  //   );
  // }

  return (
    <div className={cn("relative flex shadow-sm w-8 aspect-[3/2] rounded-sm border-accent-1 bg-background border-2 justify-center items-center", className)}>
      {is_reviewed && (
        <Link
          href={`/film/${movieId}/review/${is_reviewed}`}
          className="absolute -bottom-2 -left-2 p-0.5 bg-background rounded-full"
        >
          <Text size={12} className="" />
        </Link>
      )}
      <p className="text-accent-1 font-bold text-sm">
        {rating}
      </p>
      {/* {is_liked && (
        <Heart
          size={16}
          className="absolute -bottom-2 -right-2 text-background fill-accent-pink"
        />
      )} */}
    </div>
  );
}
