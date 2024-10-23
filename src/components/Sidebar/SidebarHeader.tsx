import { Box } from '@/components/Box/Box';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { useUI } from '@/context/ui-context';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '@/config/icons';

export default function SidebarHeader({
  className,
}: {
  className?: string;
}) {
  const { isSidebarCollapsed, expandSidebar, collapseSidebar } = useUI();
  return (
    <Box className={cn('', className)}>
      <Button
        onClick={isSidebarCollapsed ? expandSidebar : collapseSidebar}
        variant={'ghost'}
        className={`
            relative flex items-center justify-start p-2 my-1
            rounded-md
            ${isSidebarCollapsed && 'justify-center'}
        `}
      >
        <Icons.site.logo className={`fill-accent-1 w-3/4`} />
        {/* <Image
          priority
          src={siteConfig.icon.file}
          alt={siteConfig.icon.alt}
          className={`
              overflow-hidden transition-all
              ${!isSidebarCollapsed ? 'w-0' : 'w-6'}
          `}
          width={24}
        />
        <Image
          priority
          src={siteConfig.logo.file}
          alt={siteConfig.logo.alt}
          className={`
              overflow-hidden transition-all
              ${!isSidebarCollapsed ? 'w-36' : 'w-0'}
          `}
          width={144}
        /> */}
      </Button>
    </Box>
  );
}
