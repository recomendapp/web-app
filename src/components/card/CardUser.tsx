import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { User } from "@/types/type.db";
import { ImageWithFallback } from "../utils/ImageWithFallback";
import Link from "next/link";
import { ContextMenuMovie } from "../context-menu/ContextMenuMovie";
import { UserAvatar } from "../User/UserAvatar/UserAvatar";

interface CardUserProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		user: User;
	}

const CardUserDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserProps, "variant">
>(({ className, user, children, ...props }, ref) => {
	return (
		<Card
			ref={ref}
			className={cn(
				"flex items-center rounded-xl h-20 bg-muted hover:bg-muted-hover p-1",
				className
			)}
			{...props}
		>
			<UserAvatar username={user?.username} avatar_url={user?.avatar_url} />
			<div className='px-2 py-1 space-y-1'>
				<p className='line-clamp-2 break-words'>{user?.username}</p>
				<p className="text-muted-foreground">@{user?.username}</p>
				{children}
			</div>
		</Card>
	);
});
CardUserDefault.displayName = "CardUserDefault";

const CardUser = React.forwardRef<
	HTMLDivElement,
	CardUserProps
>(({ className, user, variant = "default", ...props }, ref) => {
	return (
	// <ContextMenuMovie movie={movie}>
		<Link href={`/@${user?.username}`}>
			{variant === "default" ? (
				<CardUserDefault ref={ref} className={className} user={user} {...props} />
			) : null}
		</Link>
	// </ContextMenuMovie>
	);
});
CardUser.displayName = "CardUser";

export {
	type CardUserProps,
	CardUser,
	CardUserDefault,
}