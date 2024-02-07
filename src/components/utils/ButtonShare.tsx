// UI
import { Button } from '@/components/ui/button';
import copyToClipboard from '@/hooks/copy-to-clipboard';
import { cn } from '@/lib/utils';

// ICONS
import { Share2 } from 'lucide-react';

export default function ButtonShare({
  url,
  icon,
  className
}: {
  url: string;
  icon?: boolean;
  className?: string;
}) {
  if (icon) {
    return (
      <Button className={cn('', className)} variant={'action'} onClick={() => copyToClipboard(url)}>
        <Share2 />
      </Button>
    );
  }

  return <p onClick={() => copyToClipboard(url)}>Partager</p>;
}
