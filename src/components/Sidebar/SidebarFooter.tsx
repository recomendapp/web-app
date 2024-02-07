import { Button } from '@/components/ui/button';
import LanguageSwticher from '../Language/LanguageSwitcher';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Box } from '@/components/Box/Box';
import { useUiContext } from '@/context/ui-context';

export default function SidebarFooter() {

  const { isSidebarCollapsed, expandSidebar, collapseSidebar } = useUiContext();
  return (
    <Box
      className={`flex items-center px-3 py-2 gap-2
            ${!isSidebarCollapsed ? 'justify-between' : 'justify-center'}
        `}
    >
      {!isSidebarCollapsed && <LanguageSwticher />}
      <Button
        onClick={isSidebarCollapsed ? expandSidebar : collapseSidebar}
        size={'icon'}
        variant={'ghost'}
        className="rounded-full"
      >
        {!isSidebarCollapsed ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </Box>
  );
}
