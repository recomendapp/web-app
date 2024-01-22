import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserNav } from '@/components/User/UserNav/UserNav';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { createServerClient } from '@/lib/supabase/server';

interface HeaderMinimalProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function HeaderMinimal({ className }: HeaderMinimalProps) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header
      className={cn(
        'sticky top-0 z-[1] bg-background flex justify-between items-center p-4 h-header w-screen',
        className
      )}
    >
      <div className="flex gap-4 w-full items-center">
        <Link href={'/'} className={'py-1 px-1 lg:p-4'}>
          <Image
            src={siteConfig.logo.href}
            alt={siteConfig.logo.alt}
            width={200}
            height={200}
            priority
            className="hidden lg:block"
          />
          <Image
            src={siteConfig.icon.href}
            alt={siteConfig.logo.alt}
            width={40}
            height={40}
            priority
            className="lg:hidden"
          />
        </Link>
      </div>
      <div>
        {!session ? (
          <Button asChild>
            <Link href={'/login'} className="whitespace-nowrap">
              Se connecter
            </Link>
          </Button>
        ) : (
          <UserNav following={false} />
        )}
      </div>
    </header>
  );
}
