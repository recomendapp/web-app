'use client';
import React, {
  createContext,
  useState,
} from 'react';
import { SidebarRoutes } from './SidebarRoutes';
import SidebarCollection from './Collection/SidebarCollection';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';

export const SidebarContext = createContext<any| null>(null);

export function Sidebar() {
  const [ sidebarExpanded, setSidebarExpanded ] = useState(true);

  return ( 
    <SidebarContext.Provider value={{sidebarExpanded, setSidebarExpanded}}>
      <aside
        className={`
          hidden lg:block transition-all
          ${sidebarExpanded ? 'w-[300px]' : 'w-[80px]'}
        `}
      >
        <nav className="h-full flex flex-col gap-2">
            <SidebarHeader/>
            <SidebarRoutes/>
            <SidebarCollection />
            <SidebarFooter/>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}
