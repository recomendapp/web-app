'use client';

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import SearchBar from '@/components/Search/SearchBar';
import { PlaylistCreateButton } from '@/components/Playlist/Button/PlaylistCreateButton';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '../ui/sidebar';
import { Button } from '@/components/ui/button';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';
import { Icons } from '@/config/icons';

export default function HeaderLeftSide({
  className,
} : {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const common = useTranslations('common');
  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      <SidebarTrigger className='md:hidden'/>
      <Button
        onClick={router.back}
        variant="ghost"
        size="icon"
        className="rounded-full justify-center shrink-0"
      >
        <Icons.chevronLeft />
        <span className="sr-only">{upperFirst(common('messages.backward'))}</span>
      </Button>
      <Button
        onClick={router.forward}
        variant="ghost"
        size="icon"
        className="rounded-full justify-center shrink-0"
      >
        <Icons.chevronRight />
        <span className="sr-only">{upperFirst(common('messages.forward'))}</span>
      </Button>
      <SearchBar />
      {pathname == '/collection' && <PlaylistCreateButton />}
    </div>
  );
}
