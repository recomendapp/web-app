'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import { PlaylistModal } from '@/components/Modals/Playlist/PlaylistModal';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function PlaylistCreateButton({
  className,
  icon = true,
  filmId,
}: {
  className?: string;
  icon?: boolean;
  filmId?: string;
}) {
  const { user } = useAuth();
  const common = useTranslations('common');
  const { openModal } = useModal();

  if (!user) return null;

  return (
      <TooltipBox tooltip={common('playlist.actions.create')}>
        <Button
          variant={'ghost'}
          size={'icon'}
          className={cn("rounded-full shrink-0", className)}
          onClick={() => openModal(PlaylistModal, { filmId })}
        >
          {icon ? <Plus /> : common('playlist.actions.create')}
          {icon && <span className="sr-only">
            {common('playlist.actions.create')}
          </span>}
        </Button>
      </TooltipBox>
  )
}
