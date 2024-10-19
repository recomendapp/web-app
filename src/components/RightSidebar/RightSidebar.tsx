'use client';

import { useRightSidebar } from '@/context/right-sidebar-context';
import { Box } from '../Box/Box';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useUI } from '@/context/ui-context';

export default function RightSidebar() {
  const { collapseRightPanel, rightPanelContent, rightPanelTitle } = useUI();

  // if (!isOpen) return null;

  return (
    <Box className="h-full w-full relative p-0 overflow-hidden">
      {/* <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full absolute top-2 right-2 w-7 h-7"
            onClick={collapseRightPanel}
          >
          <X size={10}/>
      </Button> */}
        {/* HEADER */}
        <div className="h-header p-4 flex items-center justify-between">
          <h3 className="text-xl line-clamp-1">{rightPanelTitle}</h3>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full w-8 h-8"
            onClick={collapseRightPanel}
          >
            <X />
          </Button>
        </div>
        <div className="p-4 h-full overflow-hidden">{rightPanelContent}</div>
    </Box>
  );
}
