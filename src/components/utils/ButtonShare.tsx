// UI
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';
import { capitalize } from 'lodash';

// ICONS
import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ButtonShare({
  url,
  icon,
  className
}: {
  url: string;
  icon?: boolean;
  className?: string;
}) {
  const common = useTranslations('common');
  const copyToClipboard = useCopyToClipboard();
  if (icon) {
    return (
      <Button className={cn('', className)} variant={'action'} onClick={() => copyToClipboard(url)}>
        <Share2 />
      </Button>
    );
  }

  return <p onClick={() => copyToClipboard(url)}>{capitalize(common('word.share'))}</p>;
}
