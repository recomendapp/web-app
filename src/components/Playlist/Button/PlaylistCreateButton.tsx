'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React, { useState } from 'react';
import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext/auth-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


export function PlaylistCreateButton({
    icon = true,
    filmId,
}: {
    icon?: boolean;
    filmId?: string;
}) {
  const { user } = useAuth();
  const [ open, setOpen ] = useState(false);

  if (!user)
    return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
                variant={'ghost'}
                size={'icon'}
                className="rounded-full"
                onClick={() => setOpen(!open)}
            >
                {icon ?
                    <Plus />
                :
                    "Créer une playlist"
                }
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Créer une playlist
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
        
        <DialogContent className="max-w-3xl">
            <DialogHeader>
            <DialogTitle>
                Créer une playlist
            </DialogTitle>
            </DialogHeader>
            <PlaylistForm
                success={() => setOpen(false)}
                userId={user.id}
                filmId={filmId}
            />
        </DialogContent>
    </Dialog>
  );
}
