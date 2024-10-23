import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserNav } from '@/components/User/UserNav/UserNav';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { createServerClient } from '@/lib/supabase/server';
import { Icons } from '@/config/icons';

interface HeaderMinimalProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function HeaderMinimal({ className }: HeaderMinimalProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      className={cn(
        'sticky top-0 z-[1] bg-background flex justify-between items-center p-4 h-header w-screen',
        className
      )}
    >
      <div className="flex gap-4 w-full items-center">
        <Link href={'/'} className={'py-1 px-1 lg:p-4'}>
          <Icons.site.logo className="hidden lg:block fill-accent-1 w-48" />
          <Icons.site.icon className="lg:hidden fill-accent-1 w-10" />
        </Link>
      </div>
      <div>
        {user ? (
          <UserNav />
        ) : (
          <Button asChild>
            <Link href={'/auth/login'} className="whitespace-nowrap">
              Se connecter
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
