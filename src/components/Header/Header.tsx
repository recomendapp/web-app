import { cn } from '@/lib/utils';
import HeaderLeftSide from './HeaderLeftSide';
import { createServerClient } from '@/lib/supabase/server';
import HeaderCenterSide from './HeaderCenterSide';
import HeaderRightSide from './HeaderRightSide';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Header({ className }: HeaderProps) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header
      className={cn(
        'hidden sticky top-0 z-[1] bg-background lg:grid grid-cols-3 place-content-center border-b p-4 lg:h-header',
        className
      )}
    >
      <HeaderLeftSide />
      <HeaderCenterSide className='justify-center'/>
      <HeaderRightSide session={session} className='justify-end'/>
    </header>
  );
}
