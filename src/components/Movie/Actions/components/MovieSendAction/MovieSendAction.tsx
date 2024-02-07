'use client';
import { useRouter } from 'next/navigation';

// AUTH
import { useAuth } from '@/context/auth-context';

// COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// ICONS
import { Send } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useModal } from '@/context/modal-context';
import { MovieSendModal } from '@/components/Modals/Movie/Actions/MovieSendModal';

interface MovieSendActionProps {
  movieId: number;
}

export function MovieSendAction({ movieId }: MovieSendActionProps) {
  const { user, loading } = useAuth();
  const { openModal } = useModal();

  const router = useRouter();

  // const [open, setOpen] = useState(false);

  if (user === null) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={loading}
              size="icon"
              variant={'action'}
              className="rounded-full"
            >
              <Send />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Connectez-vous</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={loading}
              size="icon"
              variant={'action'}
              className="rounded-full"
              onClick={() => openModal({
                id: `movie-${movieId}-send`,
                header: {
                  title: 'Envoyer à',
                },
                content: (
                  <MovieSendModal
                    id={`movie-${movieId}-send`}
                    movieId={movieId} 
                  />
                ),
              })}
            >
              {loading ? <Icons.spinner className="animate-spin" /> : <Send />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Envoyer à un(e) ami(e)</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Envoyer à</DialogTitle>
    //     </DialogHeader>
    //     <SendForm user={user} movieId={movieId} setOpen={setOpen} />
    //   </DialogContent>
    // </Dialog>
  );
}
