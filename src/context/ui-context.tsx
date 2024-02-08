'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { setCookie } from 'cookies-next';
import React, { createContext, useContext, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

export interface UiContextType {
  uiLayout: number[];
  setSidebarLayout: (layout: number[]) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  sidebarCollapsedSize: number;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  sidebarRef: React.RefObject<ImperativePanelHandle> | undefined;
  sidebarMinSize: number;
  sidebarMaxSize: number;
}

const defaultState: UiContextType = {
  uiLayout: [],
  setSidebarLayout: () => {},
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {},
  sidebarCollapsedSize: 5,
  collapseSidebar: () => {},
  expandSidebar: () => {},
  sidebarRef: undefined,
  sidebarMinSize: 14,
  sidebarMaxSize: 20,
};

const UiContextProvider = createContext(defaultState);

export function UiContext({
  children,
  defaultLayout = [265, 440, 0],
	cookieSidebarCollapsed = false,
}: {
  children: React.ReactNode;
  defaultLayout: number[] | undefined
	cookieSidebarCollapsed?: boolean
}) {
  // LAYOUT
  const [ uiLayout, setSidebarLayout ] = useState(defaultLayout);
  // *========== START SIDEBAR ==========*
  const [ isSidebarCollapsed, setIsSidebarCollapsed ] = useState(cookieSidebarCollapsed);
  const sidebarCollapsedSize = 4;
  const sidebarMinSize = 14;
  const sidebarMaxSize = 20;
  const sidebarRef = useRef<ImperativePanelHandle >(null);
  const collapseSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.collapse();
      setIsSidebarCollapsed(true);
      setCookie("ui-sidebar:collapsed", JSON.stringify(true), {
        path: "/",
      });
      // document.cookie = `ui-sidebar:collapsed=${JSON.stringify(true)}; path=/`
    }
  }
  const expandSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.expand();
      setIsSidebarCollapsed(false);
      setCookie("ui-sidebar:collapsed", JSON.stringify(false), {
        path: "/",
      });
      // document.cookie = `ui-sidebar:collapsed=${JSON.stringify(false)}; path=/`
    }
  }
  // *========== END SIDEBAR ==========*

  // *========== START RIGHTPANEL ==========*
  const [ isRightPanelCollapsed, setIsRightPanelCollapsed ] = useState(true);
  const rightPanelCollapsedSize = 0;
  const rightPanelRef = useRef<ImperativePanelHandle >(null);
  const collapseRightPanel = () => {
    setIsRightPanelCollapsed(true);
    document.cookie = `ui-rightpanel:collapsed=${JSON.stringify(true)}`
  }
  const expandRightPanel = () => {
    setIsRightPanelCollapsed(false);
    document.cookie = `ui-rightpanel:collapsed=${JSON.stringify(false)}`
  }
  // *========== END RIGHTPANEL ==========*

  return (
    <UiContextProvider.Provider
      value={{
        uiLayout,
        setSidebarLayout,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        sidebarCollapsedSize,
        collapseSidebar,
        expandSidebar,
        sidebarRef,
        sidebarMinSize,
        sidebarMaxSize,
      }}
    >
      <TooltipProvider delayDuration={100}>
        {children}
      </TooltipProvider>
    </UiContextProvider.Provider>
  );
}

export const useUiContext = () => useContext(UiContextProvider);
