import { Button } from '@/components/ui/button';
import LanguageSwticher from '../Language/LanguageSwitcher';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '@/components/Box/Box';
import { useUiContext } from '@/context/ui-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ImageWithFallback } from '../utils/ImageWithFallback';

export default function SidebarFooter({
  className
} : {
  className?: string;
}) {

  const { isSidebarCollapsed, expandSidebar, collapseSidebar } = useUiContext();
  return (
    <Box
      className={cn('', className)}
    >
      <Link
        href={"https://oneummah.org.uk/appeals/gaza-emergency-appeal/"}
        target="_blank"
      >
        <ImageWithFallback
          src="/assets/free-palestine-min.webp"
          alt="Free Palestine"
          width={80}
          height={80}
        />
      </Link>
      {/* {!isSidebarCollapsed && <LanguageSwticher />}
      <Button
        onClick={isSidebarCollapsed ? expandSidebar : collapseSidebar}
        size={'icon'}
        variant={'ghost'}
        className="rounded-full"
      >
        {!isSidebarCollapsed ? <ChevronLeft /> : <ChevronRight />}
      </Button> */}
    </Box>
  );
}
