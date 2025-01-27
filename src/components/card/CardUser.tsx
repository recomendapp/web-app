import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { User } from "@/types/type.db";
import { UserAvatar } from "../User/UserAvatar/UserAvatar";
import { WithLink } from "../utils/WithLink";
import { Icons } from "@/config/icons";

interface CardUserProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default" | "icon" | "username" | "inline";
		user: User;
		linked?: boolean;
		width?: number;
		height?: number;
	}

const CardUserDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserProps, "variant">
>(({ className, user, children, ...props }, ref) => {
	return (
		<WithLink
			ref={ref}
			as={Card}
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
		</WithLink>
	);
});
CardUserDefault.displayName = "CardUserDefault";

const CardUserIcon = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserProps, "variant">
>(({ className, user, linked, width, height, children, ...props }, ref) => {
	return (
		<WithLink
			ref={ref}
			href={linked ? `/@${user?.username}` : undefined}
			className={cn(
				"",
				className
			)}
			{...props}
		>
			<UserAvatar
			className={`w-[${width || 25}px] h-[${height || 25}px]`}
			username={user?.username}
			avatar_url={user?.avatar_url}
			/>
		</WithLink>
	);
});
CardUserIcon.displayName = "CardUserIcon";

const CardUserUsername = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserProps, "variant">
>(({ className, user, linked, width, height, children, ...props }, ref) => {
	return (
		<WithLink
			ref={ref}
			href={linked ? `/@${user?.username}` : undefined}
			className={cn(
				"flex items-center gap-1 text-foreground font-bold hover:underline",
				className
			)}
			{...props}
		>
			{user?.username}
			{user?.premium && (
				<Icons.premium className='fill-blue-400 inline w-3'/>
			)}
		</WithLink>
	);
});
CardUserUsername.displayName = "CardUserUsername";

const CardUserInline = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserProps, "variant">
>(({ className, user, children, ...props }, ref) => {
	return (
		<div className={cn("flex items-center gap-1", className)}>
			<CardUserIcon user={user} {...props}/>
			<CardUserUsername user={user} {...props}/>
		</div>
	);
});
CardUserInline.displayName = "CardUserInline";

const CardUser = React.forwardRef<
	HTMLDivElement,
	CardUserProps
>(({ className, user, variant = "default", linked = true, ...props }, ref) => {
	return variant === "default" ? (
		<CardUserDefault ref={ref} className={className} user={user} linked={linked} {...props} />
	) : variant === "icon" ? (
		<CardUserIcon ref={ref} className={className} user={user} linked={linked} {...props} />
	) : variant === "username" ? (
		<CardUserUsername ref={ref} className={className} user={user} linked={linked} {...props} />
	) : variant === "inline" ? (
		<CardUserInline ref={ref} className={className} user={user} linked={linked} {...props} />
	) : null;
});
CardUser.displayName = "CardUser";

export {
	type CardUserProps,
	CardUser,
	CardUserDefault,
}