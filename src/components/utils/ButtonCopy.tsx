import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Icons } from '@/config/icons';
import copyToClipboard from '@/hooks/copy-to-clipboard';

interface ButtonCopyProps extends React.ComponentPropsWithRef<typeof Button> {
	text: string;
}

export const ButtonCopy = React.forwardRef<
	HTMLButtonElement,
	ButtonCopyProps
>(({ text, className, ...props }, ref) => {
	const [copied, setCopied] = React.useState(false);
	const timeout = React.useRef<NodeJS.Timeout | null>(null);

	const handleCopy = () => {
		copyToClipboard(text);
		setCopied(true);
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		timeout.current = setTimeout(() => setCopied(false), 2000);
	};

	React.useEffect(() => {
		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		};
	}, []);

	return (
		<Button
		className={cn('shrink-0', className)}
		onClick={handleCopy}
		{...props}
		>
			<span className='sr-only'>Copy</span>
			{copied ? <Icons.copyDone /> : <Icons.copy />}
		</Button>
	)
});
