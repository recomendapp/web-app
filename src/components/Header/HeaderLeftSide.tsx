'use client'

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import SearchBar from '@/components/Search/SearchBar';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '../ui/sidebar';
import { Button } from '@/components/ui/button';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import {
  ButtonGroup,
} from "@/components/ui/button-group"
import { useModal } from '@/context/modal-context';
import { PlaylistModal } from '../Modals/playlists/PlaylistModal';
import { useT } from '@/lib/i18n/client';

export default function HeaderLeftSide({
  className,
} : {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useT();
  return (
    // <div className={cn("flex items-center gap-4 w-full", className)}>
      <ButtonGroup className='w-full'>
        <ButtonGroup>
          <SidebarTrigger className='md:hidden'/>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label={upperFirst(t('common.messages.backward'))} onClick={router.back}>
            <Icons.chevronLeft />
            <span className="sr-only">{upperFirst(t('common.messages.backward'))}</span>
          </Button>
          <Button variant="outline" size="icon" aria-label={upperFirst(t('common.messages.forward'))} onClick={router.forward}>
            <Icons.chevronRight />
            <span className="sr-only">{upperFirst(t('common.messages.forward'))}</span>
          </Button>
        </ButtonGroup>
        <SearchBar />
        {pathname == '/collection' && <ButtonPlaylistCreate />}
      </ButtonGroup>
    // </div>
  );
}

const ButtonPlaylistCreate = () => {
  const { t } = useT();
  const { openModal } = useModal();
  return (
    <Button variant="outline" size="icon" aria-label={upperFirst(t('common.messages.create_a_playlist'))} onClick={() => openModal(PlaylistModal, {})}>
      <Icons.add />
      <span className="sr-only">{upperFirst(t('common.messages.create_a_playlist'))}</span>
    </Button>
  )
}
