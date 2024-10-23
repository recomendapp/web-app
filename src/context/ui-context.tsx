'use client';

import FriendsList from '@/components/RightSidebar/FriendsList';
import { Device, useDevice } from '@/hooks/use-device';
import { setCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

export interface UiContextProps {
  uiLayout: number[];
  setUiLayout: (layout: number[]) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  sidebarCollapsedSize: number;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  sidebarRef: React.RefObject<ImperativePanelHandle> | undefined;
  sidebarMinSize: number;
  sidebarMaxSize: number;
  isRightPanelCollapsed: boolean;
  setIsRightPanelCollapsed: (collapsed: boolean) => void;
  rightPanelCollapsedSize: number;
  collapseRightPanel: () => void;
  expandRightPanel: () => void;
  rightPanelRef: React.RefObject<ImperativePanelHandle> | undefined;
  rightPanelMinSize: number;
  rightPanelMaxSize: number;
  rightPanelContent: React.ReactNode | null;
  setRightPanelContent: (content: React.ReactNode) => void;
  rightPanelTitle: string | null;
  setRightPanelTitle: (title: string) => void;
  device: Device;
}

// const defaultState: UiContextProps = {
//   uiLayout: [],
//   setUiLayout: () => {},
//   isSidebarCollapsed: false,
//   setIsSidebarCollapsed: () => {},
//   sidebarCollapsedSize: 5,
//   collapseSidebar: () => {},
//   expandSidebar: () => {},
//   sidebarRef: undefined,
//   sidebarMinSize: 14,
//   sidebarMaxSize: 20,
//   isRightPanelCollapsed: true,
//   setIsRightPanelCollapsed: () => {},
//   rightPanelCollapsedSize: 0,
//   collapseRightPanel: () => {},
//   expandRightPanel: () => {},
//   rightPanelRef: undefined,
//   rightPanelMinSize: 0,
//   rightPanelMaxSize: 20,
//   rightPanelContent: null,
//   setRightPanelContent: () => {},
//   rightPanelTitle: null,
//   setRightPanelTitle: () => {},
// };

// const UiContextProvider = createContext(defaultState);
const UIContext = createContext<UiContextProps | undefined>(undefined);

export const UIProvider = ({
  children,
  defaultLayout = [265, 440, 0],
	cookieSidebarCollapsed = false,
  cookieRightPanelCollapsed = true,
} : {
  children: React.ReactNode;
  defaultLayout: number[] | undefined
	cookieSidebarCollapsed?: boolean
  cookieRightPanelCollapsed?: boolean
}) => {
  // LAYOUT
  const [ uiLayout, setUiLayout ] = useState(defaultLayout);
  // *========== START SIDEBAR ==========*
  const [ isSidebarCollapsed, setIsSidebarCollapsed ] = useState(cookieSidebarCollapsed);
  const sidebarCollapsedSize = 2;
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
    }
  }
  const expandSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.expand();
      setIsSidebarCollapsed(false);
      setCookie("ui-sidebar:collapsed", JSON.stringify(false), {
        path: "/",
      });
    }
  }
  // *========== END SIDEBAR ==========*

  // *========== START RIGHTPANEL ==========*
  const [ isRightPanelCollapsed, setIsRightPanelCollapsed ] = useState(cookieRightPanelCollapsed);
  const rightPanelCollapsedSize = 0;
  const rightPanelMinSize = 20;
  const rightPanelMaxSize = 30;
  const rightPanelRef = useRef<ImperativePanelHandle >(null);
  const collapseRightPanel = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.collapse();
      setIsRightPanelCollapsed(true);
      setCookie("ui-right-panel:collapsed", JSON.stringify(false), {
        path: "/",
      });
    }
  }
  const expandRightPanel = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.expand();
      setIsRightPanelCollapsed(false);
      setCookie("ui-right-panel:collapsed", JSON.stringify(true), {
        path: "/",
      });
    }
  }
  const [rightPanelContent, setRightPanelContent] = useState<React.ReactNode | null>(<FriendsList />);
  const [rightPanelTitle, setRightPanelTitle] = useState<string | null>('Suivis');
  // *========== END RIGHTPANEL ==========*

  // *========== IS MOBILE ==========*

  const device = useDevice();

  // *========== END IS MOBILE ==========*

  return (
    <UIContext.Provider
      value={{
        uiLayout,
        setUiLayout,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        sidebarCollapsedSize,
        collapseSidebar,
        expandSidebar,
        sidebarRef,
        sidebarMinSize,
        sidebarMaxSize,
        isRightPanelCollapsed,
        setIsRightPanelCollapsed,
        rightPanelCollapsedSize,
        collapseRightPanel,
        expandRightPanel,
        rightPanelRef,
        rightPanelMinSize,
        rightPanelMaxSize,
        rightPanelContent,
        setRightPanelContent,
        rightPanelTitle,
        setRightPanelTitle,
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
