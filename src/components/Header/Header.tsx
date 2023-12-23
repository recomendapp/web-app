import { cn } from '@/lib/utils';
// import { createServerClient } from '@/lib/supabase/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserNav } from '../User/UserNav/UserNav';
import HeaderLeftSide from './HeaderLeftSide';
import { createServerClient } from '@/lib/supabase/server';
import HeaderCenterSide from './HeaderCenterSide';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Header({ className }: HeaderProps) {
  
  const supabase = createServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header
      className={cn(
        'hidden sticky top-0 z-[1] bg-background lg:flex justify-between items-center border-b p-4 lg:h-header',
        className
      )}
    >
      <HeaderLeftSide />
      <HeaderCenterSide />
      { !session ?
        <Button asChild>
          <Link href={'/login'} className="whitespace-nowrap">
            Se connecter
          </Link>
        </Button> 
      :
        <UserNav />
      }
    </header>
  );
}
