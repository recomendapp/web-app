'use client';
import React, { createContext, useState } from 'react';
import { SidebarRoutes } from './SidebarRoutes';
import SidebarCollection from './Collection/SidebarCollection';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import { TooltipProvider } from '../ui/tooltip';
import { useUiContext } from '@/context/ui-context';

export function Sidebar() {
  const { isSidebarCollapsed } = useUiContext();
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        data-collapsed={isSidebarCollapsed}
        className="group flex flex-col gap-4 data-[collapsed=true]:py-0 w-full"
      >
        <nav className='flex flex-col gap-2 h-full'>
          <SidebarHeader className='grid group-[[data-collapsed=true]]:justify-center'/>
          <SidebarRoutes className='grid group-[[data-collapsed=true]]:justify-center'/>
          <SidebarCollection className='flex flex-col group-[[data-collapsed=true]]:items-center'/>
        </nav>
      </aside>  
    </TooltipProvider>
  );
}

