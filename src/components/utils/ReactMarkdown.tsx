import { Link } from "@/lib/i18n/routing";
import React from 'react';
import ReactMarkdownPrimitive from 'react-markdown';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

interface ReactMarkdownProps extends React.ComponentProps<typeof ReactMarkdownPrimitive> {}

export const ReactMarkdown = React.forwardRef<
	HTMLDivElement,
	ReactMarkdownProps
>(({ children, ...props }, ref) => {
	return (
		<ReactMarkdownPrimitive
		components={{
			a: ({ href = '', children }) => (
				<Link
				href={href}
				className={cn(
					buttonVariants({ variant: 'link' }),
					'p-0 inline'
				)}
				>
					{children}
				</Link>
			),
		}}
		{...props}
		>
		{children}
		</ReactMarkdownPrimitive>
	);
});
ReactMarkdown.displayName = 'ReactMarkdown';