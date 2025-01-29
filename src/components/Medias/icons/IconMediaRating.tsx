import * as React from "react";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { cva, VariantProps } from "class-variance-authority";

const iconMediaRatingVariants = cva(
	"relative flex shadow-sm w-8 aspect-[3/2] rounded-sm bg-background border-2 justify-center items-center shrink-0 font-bold text-sm",
	{
		variants: {
			variant: {
				general: "text-accent-pink border-accent-pink",
				follower: "text-blue-500 border-blue-500",
				user: "text-accent-1 border-accent-1",
			}
		}
	}
)

interface IconMediaRatingProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof iconMediaRatingVariants> {
	rating?: number | null;
	tooltip?: string | null;
}

const IconMediaRating = React.forwardRef<HTMLDivElement, IconMediaRatingProps>(
	({ rating, tooltip, variant = "user", className, ...props }, ref) => {
	if (!rating) return null;
	return (
	<TooltipBox tooltip={tooltip}>
		<div
		ref={ref}
		className={iconMediaRatingVariants({ variant, className })}
		{...props}
		>
		{rating % 1 === 0 ? rating : rating.toFixed(1)}
		</div>
	</TooltipBox>
	);
});
IconMediaRating.displayName = "IconMediaRating";

export {
	IconMediaRating,
	iconMediaRatingVariants,
}