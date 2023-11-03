'use client';
import React, {
  createRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { SidebarRoutes } from './SidebarRoutes';
import SidebarCollection from './Collection/SidebarCollection';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  skeleton?: boolean;
}

export function Sidebar({
  className,
}: SidebarProps) {

  const sidebarRef = createRef<HTMLDivElement>();
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);

  return (
    <nav
      ref={sidebarRef}
      className={cn(
        `transition-all hidden lg:flex flex-col gap-2 h-full overflow-hidden shrink-0
        ${sidebarExpanded ? 'w-[300px]' : 'w-[80px]'}
        `,
        className
      )}
    >
      <SidebarHeader sidebarExpanded={sidebarExpanded} />
      <SidebarRoutes sidebarExpanded={sidebarExpanded} />
      <SidebarCollection sidebarExpanded={sidebarExpanded} />
      <SidebarFooter sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
    </nav>
  );
}
