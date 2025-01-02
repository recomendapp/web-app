'use client';
import { usePathname } from 'next/navigation';

// AUTH
import { useAuth } from '@/context/auth-context';

// COMPONENTS
import { Button } from '@/components/ui/button';

// ICONS
import { Send } from 'lucide-react';
import { Icons } from '@/config/icons';
import { ModalMovieSend } from '@/components/Modals/Movie/Actions/ModalMovieSend';
import Link from 'next/link';
import { useModal } from '@/context/modal-context';
import { TooltipBox } from '@/components/Box/TooltipBox';

interface MovieSendActionProps {
  movieId: number;
}

export function MovieSendAction({ movieId }: MovieSendActionProps) {
  const { user, loading } = useAuth();
  const { openModal } = useModal();
  const pathname = usePathname();

  if (user === null) {
    return (
      <TooltipBox tooltip={'Connectez-vous'}>
        <Button
          size="icon"
          variant={'action'}
          className="rounded-full"
          asChild
        >
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <Send />
          </Link>
        </Button>
      </TooltipBox>
    );
  }

  return (
    <TooltipBox tooltip={'Envoyer à un(e) ami(e)'}>
      <Button
        disabled={loading}
        size="icon"
        variant={'action'}
        className="rounded-full"
        onClick={() => openModal(ModalMovieSend, { movieId })}
      >
        {loading ? <Icons.spinner className="animate-spin" /> : <Send />}
      </Button>
    </TooltipBox>
  );
}
