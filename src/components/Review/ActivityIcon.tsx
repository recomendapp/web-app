import { cn } from '@/lib/utils';
import { Text } from 'lucide-react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { TooltipBox } from '../Box/TooltipBox';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
  rating?: number | null;
  is_liked?: boolean | null;
  is_reviewed?: number | null;
  variant?: 'user' | 'general' | 'follower';
  tooltip?: string;
  className?: string;
}

export default function ActivityIcon({
  movieId,
  rating,
  is_liked,
  is_reviewed,
  variant = 'user',
  tooltip,
  className,
  onClick,
  ...props
}: RatingProps) {
  if (!rating) return null;

  return (
    <TooltipBox tooltip={tooltip}>
        <div
          className={cn(`
            relative flex shadow-sm w-8 aspect-[3/2] rounded-sm bg-background border-2 justify-center items-center shrink-0
            border-accent-1
            ${onClick && 'cursor-pointer'}
            ${variant === 'user' && 'border-accent-1'}
            ${variant === 'general' && 'border-accent-pink'}
            ${variant === 'follower' && ' border-blue-500'}
          `,
          className)}
          onClick={onClick}
          {...props}
        >
          {is_reviewed && (
            <Link
              href={`/@${movieId}/film/${movieId}`}
              className="absolute -bottom-2 -left-2 p-0.5 bg-background rounded-full"
            >
              <Text size={12} className="" />
            </Link>
          )}
          <p className={`
              font-bold text-sm
              ${variant === 'user' && 'text-accent-1'}
              ${variant === 'general' && 'text-accent-pink'}
              ${variant === 'follower' && 'text-blue-500'}
            `}
          >
            {/* make to fixed only if it's a float */}
            {rating % 1 === 0 ? rating : rating.toFixed(1)}
          </p>
          {is_liked && (
            <Heart
              size={16}
              className="absolute -bottom-2 -right-2 text-background fill-accent-pink"
            />
          )}
        </div>
    </TooltipBox>
  );
}
