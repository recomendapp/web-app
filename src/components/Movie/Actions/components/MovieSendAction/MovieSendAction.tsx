'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// AUTH
import { useAuth } from '@/context/AuthContext/auth-context';

// COMPONENTS
import SendForm from './SendForm';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// ICONS
import { AlertCircle, Send } from 'lucide-react';
import { Icons } from '@/components/icons';

interface MovieSendActionProps {
  movieId: string;
}

export function MovieSendAction({ movieId }: MovieSendActionProps) {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={loading && true}
              size="icon"
              variant={'action'}
              className="rounded-full"
            >
              {loading ? <Icons.spinner className="animate-spin" /> : <Send />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Connectez-vous</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={loading && true}
              size="icon"
              variant={'action'}
              className="rounded-full"
              onClick={() => setOpen(true)}
            >
              <Send />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Envoyer à un(e) ami</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Envoyer à</DialogTitle>
        </DialogHeader>
        <SendForm user={user} movieId={movieId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
