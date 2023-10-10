"use client"

import React, { useEffect } from "react";
import { useRightSidebar } from "./RightSidebarContext";

export default function RightSidebarServer({
    panelTitle,
    panelContent,
} : {
    panelTitle: string,
    panelContent: React.ReactNode
}) {
    const { openPanel, setPanelTitle, setPanelContent } = useRightSidebar();

    useEffect(() => {
        openPanel()
        setPanelTitle(panelTitle)
        setPanelContent(panelContent)
    }, [])

    return <></>
}