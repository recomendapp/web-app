import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Icons } from '@/config/icons';
import { upperFirst } from 'lodash';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useT } from '@/lib/i18n/client';

interface ButtonCopyProps extends React.ComponentPropsWithRef<typeof Button> {
	text: string;
}

const ButtonCopy = React.forwardRef<
	HTMLButtonElement,
	ButtonCopyProps
>(({ text, className, ...props }, ref) => {
	const { t } = useT();
	const [copied, setCopied] = React.useState(false);
	const timeout = React.useRef<NodeJS.Timeout | null>(null);
	const copyToClipboard = useCopyToClipboard();

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
			<span className='sr-only'>{upperFirst(t('common.messages.copy_link'))}</span>
			{copied ? <Icons.copyDone /> : <Icons.copy />}
		</Button>
	)
});
ButtonCopy.displayName = 'ButtonCopy';

export {
	ButtonCopy
}
