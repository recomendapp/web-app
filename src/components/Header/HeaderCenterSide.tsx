'use client';

import { cn } from '@/lib/utils';
import { usePathname } from '@/lib/i18n/routing';

export default function HeaderCenterSide({
  className,
} : {
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {pathname.startsWith('/feed') && <div>Feed</div>}
    </div>
  );
}
