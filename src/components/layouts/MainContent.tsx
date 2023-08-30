'use client';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { useEffect, useState } from 'react';

interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function MainContent({ children, className }: MainContentProps) {
  const [sidebarWidth, setSidebarWidth] = useState<undefined | number>(
    undefined
  );
  const [separatorXPosition, setSeparatorXPosition] = useState<
    undefined | number
  >(undefined);
  const [dragging, setDragging] = useState(false);
  const sidebarMaxWidth = 1500;
  const sidebarMinWidth = 300;
  const sidebarMinimizeWidth = 80;
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // useEffect(() => {
  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);

  //   return () => {
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };
  // });

  const onMouseDown = (e: React.MouseEvent) => {
    setSeparatorXPosition(e.clientX);
    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging && sidebarWidth && separatorXPosition) {
      const newLeftWidth = sidebarWidth + e.clientX - separatorXPosition;
      setSeparatorXPosition(e.clientX);

      if (newLeftWidth > sidebarMinWidth && newLeftWidth < sidebarMaxWidth) {
        setSidebarExpanded(true);
      }

      if (newLeftWidth > sidebarMaxWidth) {
        setSidebarWidth(sidebarMinWidth);
        return;
      }
      if (newLeftWidth < sidebarMinWidth) {
        setSidebarExpanded(false);
        setSidebarWidth(sidebarMinimizeWidth);
        return;
      }

      setSidebarWidth(newLeftWidth);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="flex items-start h-full lg:p-2">
      <Sidebar
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={(e: boolean) => {
          setSidebarExpanded(e);
          !e && setSidebarWidth(sidebarMinimizeWidth);
          e && setSidebarWidth(400);
        }}
        className=""
      />
      <div
        className="hidden lg:block w-2 h-full cursor-col-resize"
        onMouseDown={onMouseDown}
      />
      <div className="flex flex-col bg-background col-span-3 lg:col-span-4 overflow-y-auto rounded-md h-full w-full">
        <Header />
        <div className="flex-grow relative pb-[150px] lg:pb-0 h-full">
          {children}
        </div>
      </div>
    </div>
    // <ScrollArea className={cn(" ", className)}>
    //     {children}
    // </ScrollArea>
  );
}
