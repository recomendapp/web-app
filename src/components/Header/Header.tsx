import { cn } from '@/lib/utils';
import HeaderLeftSide from './HeaderLeftSide';
import { createServerClient } from '@/lib/supabase/server';
import HeaderCenterSide from './HeaderCenterSide';
import HeaderRightSide from './HeaderRightSide';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Header({ className }: HeaderProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      className={cn(
        'hidden sticky top-0 z-[1] bg-background lg:grid grid-cols-3 place-content-center border-b p-4 lg:h-header',
        className
      )}
    >
      <HeaderLeftSide />
      <HeaderCenterSide className='justify-center'/>
      <HeaderRightSide isLogged={!!user} className='justify-end'/>
    </header>
  );
}
