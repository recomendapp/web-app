"use server"

import { cn } from '@/lib/utils/utils';
import { supabaseServer } from '@/lib/supabase/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserNav } from '../User/UserNav/UserNav';
import HeaderLeftSide from './HeaderLeftSide';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Header({ className }: HeaderProps) {

  const { data: { session } } = await supabaseServer.auth.getSession();

  return (
    <header
      className={cn(
        'hidden sticky top-0 z-[1] bg-background lg:flex justify-between items-center border-b p-4 lg:h-header lg:border-b-0',
        className
      )}
    >
      <div className="flex flex-col gap-4 w-full items-center lg:flex-row">
        <HeaderLeftSide />
      </div>
      <div className="hidden lg:block">
        { !session ?
          <Button asChild>
            <Link href={'/login'} className="whitespace-nowrap">
              Se connecter
            </Link>
          </Button> 
        :
          <UserNav />
        }
      </div>
    </header>
  );
}
