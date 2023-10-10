"use client"

import React, { createContext, useContext, useState } from 'react';

export interface RightSidebarContextType {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  panelContent: React.ReactNode | null;
  setPanelContent: (content: React.ReactNode) => void;
  panelTitle: string | null;
  setPanelTitle: (title: string) => void;
}

const defaultState: RightSidebarContextType = {
  isOpen: false,
  openPanel: () => {},
  closePanel: () => {},
  panelContent: null,
  setPanelContent: () => {},
  panelTitle: null,
  setPanelTitle: () => {}
};

const RightSidebarContext = createContext(defaultState);

export function RightSidebarProvider({
  children
} : {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelContent, setPanelContent] = useState<React.ReactNode | null>(null);
  const [panelTitle, setPanelTitle] = useState<string | null>(null); // Initialisez le titre

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  // const setPanelContent = (content: React.ReactNode) => {
  //   setPanelContent(content);
  //   openPanel(); 
  // };

  // const setTitle = (title: string) => {
  //   setPanelTitle(title);
  // };

  return (
    <RightSidebarContext.Provider value={{ isOpen, openPanel, closePanel, panelContent, setPanelContent, panelTitle, setPanelTitle }}>
      {children}
    </RightSidebarContext.Provider>
  );
}

export const useRightSidebar = () => useContext(RightSidebarContext);
