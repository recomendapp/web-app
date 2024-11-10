'use client';

import { RightPanelSocial } from '@/components/sidebar/right-panel/RightPanelSocial';
import { Device, useDevice } from '@/hooks/use-device';
import { useIsMobile } from '@/hooks/use-mobile';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

export const SIDEBAR_COOKIE_NAME = "ui-sidebar:open";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
export const RIGHT_PANEL_COOKIE_NAME = "ui-right-panel:open";
const RIGHT_PANEL_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "5rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export interface UiContextProps {
  uiLayout: number[];
  setUiLayout: (layout: number[]) => void;
  sidebarOpen: boolean;
  sidebarOpenChange: (open: boolean) => void;
  sidebarOpenMobile: boolean;
  setSidebarOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
  // sidebarCollapsedSize: number;
  // sidebarMinSize: number;
  // sidebarMaxSize: number;
  rightPanelOpen: boolean;
  rightPanelOpenChange: (open: boolean) => void;
  rightPanelOpenMobile: boolean;
  setRightPanelOpenMobile: (open: boolean) => void;
  rightPanel: {
    title: string;
    component: React.ComponentType<any>;
    props: any;
  };
  toggleRightPanel: (open?: boolean) => void;
  toggleRightPanelContent: <P,>({
    title,
    component,
    props,
  } : {
    title: string;
    component: React.ComponentType<P>;
    props: P;
  }) => void;
  // rightPanelCollapsedSize: number;
  // rightPanelMinSize: number;
  // rightPanelMaxSize: number;
  // rightPanelContent: React.ReactNode | null;
  // setRightPanelContent: (content: React.ReactNode) => void;
  // rightPanelTitle: string | null;
  // setRightPanelTitle: (title: string) => void;
  device: Device;
}

const UIContext = createContext<UiContextProps | undefined>(undefined);

export const UIProvider = ({
  children,
  defaultLayout = [265, 440, 0],
	cookieSidebarOpen = true,
  cookieRightPanelOpen = true,
} : {
  children: React.ReactNode;
  defaultLayout: number[] | undefined
	cookieSidebarOpen?: boolean
  cookieRightPanelOpen?: boolean
}) => {
  const isMobile = useIsMobile();
  // LAYOUT
  const [ uiLayout, setUiLayout ] = useState(defaultLayout);
  // *========== START SIDEBAR ==========*
  const [ sidebarOpen, setSidebarOpen ] = useState(cookieSidebarOpen);
  const [ sidebarOpenMobile, setSidebarOpenMobile ] = useState(false);
  const sidebarCollapsedSize = 2;
  const sidebarMinSize = 14;
  const sidebarMaxSize = 20;
  const sidebarOpenChange = (open: boolean) => {
    setSidebarOpen(open);
    // Save to cookie
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }
  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setSidebarOpenMobile((open) => !open)
      : sidebarOpenChange(!sidebarOpen);
  }, [isMobile, sidebarOpen, sidebarOpenChange]);
  // *========== END SIDEBAR ==========*

  // *========== START RIGHTPANEL ==========*
  const [ rightPanelOpen, setRightPanelOpen ] = useState(cookieRightPanelOpen);
  const [ rightPanelOpenMobile, setRightPanelOpenMobile ] = useState(false);
  const [ rightPanel, setRightPanel ] = useState<{
    title: string;
    component: React.ComponentType<any>;
    props: any;
  }>(RightPanelSocial());
  const rightPanelCollapsedSize = 0;
  const rightPanelMinSize = 20;
  const rightPanelMaxSize = 30;
  const rightPanelOpenChange = (open: boolean) => {
    setRightPanelOpen(open);
    // Save to cookie
    document.cookie = `${RIGHT_PANEL_COOKIE_NAME}=${open}; path=/; max-age=${RIGHT_PANEL_COOKIE_MAX_AGE}`;
  }
  const toggleRightPanel = React.useCallback((open?: boolean) => {
    const newState = open !== undefined ? open : !rightPanelOpen;
    
    if (isMobile) {
      setRightPanelOpenMobile(newState);
    } else {
      rightPanelOpenChange(newState);
    }
  }, [isMobile, rightPanelOpen, rightPanelOpenChange]);

  const toggleRightPanelContent = <P,>(content : {
    title: string;
    component: React.ComponentType<P>;
    props: P;
  }) => {
    const isSameContent = rightPanel?.title === content.title && rightPanel?.component === content.component && JSON.stringify(rightPanel?.props) === JSON.stringify(content.props);
    if (isSameContent) {
      toggleRightPanel();
    } else {
      setRightPanel(content)
      if (!rightPanelOpen) toggleRightPanel(true);
    }
  }
  
  // *========== END RIGHTPANEL ==========*

  // *========== IS MOBILE ==========*

  const device = useDevice();

  // *========== END IS MOBILE ==========*

  return (
    <UIContext.Provider
      value={{
        uiLayout,
        setUiLayout,
        // Sidebar
        sidebarOpen,
        sidebarOpenMobile,
        setSidebarOpenMobile,
        sidebarOpenChange,
        toggleSidebar,
        // RightPanel
        rightPanelOpen,
        rightPanelOpenChange,
        rightPanelOpenMobile,
        setRightPanelOpenMobile,
        rightPanel,
        toggleRightPanel,
        toggleRightPanelContent,
        device,
      }}
    >
        {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIContext');
  }
  return context;
}
