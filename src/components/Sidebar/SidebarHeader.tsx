import { Box } from '@/components/Box/Box';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { useUiContext } from '@/context/ui-context';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function SidebarHeader({
  className,
}: {
  className?: string;
}) {
  const { isSidebarCollapsed, expandSidebar, collapseSidebar } = useUiContext();
  return (
    <Box className={cn('', className)}>
      {/* {isCollapsed ? (
        <Tooltip delayDuration={0} disableHoverableContent>
          <TooltipTrigger asChild>
          <Link
            href={'/'}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "",
              // "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <Image
              priority
              src={siteConfig.icon.file}
              alt={siteConfig.icon.alt}
              className={`
                  overflow-hidden transition-all h-6 w-6
              `}
            />
          </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Accueil
          </TooltipContent>
        </Tooltip>
      ) : (
        <Link
          href={'/'}
          className={`
              relative flex items-center p-2 my-1
              rounded-md
              ${isCollapsed && 'justify-center'}
          `}
        >
          <Image
            priority
            src={siteConfig.icon.file}
            alt={siteConfig.icon.alt}
            className={`
                overflow-hidden transition-all
                ${!isCollapsed ? 'w-0' : 'w-6'}
            `}
          />
          <Image
            priority
            src={siteConfig.logo.file}
            alt={siteConfig.logo.alt}
            className={`
                overflow-hidden transition-all
                ${!isCollapsed ? 'w-36' : 'w-0'}
            `}
          />
        </Link>
      )} */}
      <Button
        onClick={isSidebarCollapsed ? expandSidebar : collapseSidebar}
        variant={'ghost'}
        className={`
            relative flex items-center justify-start p-2 my-1
            rounded-md
            ${isSidebarCollapsed && 'justify-center'}
        `}
      >
        <Image
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
        />
      </Button>
    </Box>
  );
}
