import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useT } from '@/lib/i18n/client';
import { capitalize } from 'lodash';
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
  const { t } = useT();
  const copyToClipboard = useCopyToClipboard();
  if (icon) {
    return (
      <Button className={className} variant={'outline'} onClick={() => copyToClipboard(url)}>
        <Share2 />
      </Button>
    );
  }

  return <p onClick={() => copyToClipboard(url)}>{capitalize(t('common.messages.share'))}</p>;
}
