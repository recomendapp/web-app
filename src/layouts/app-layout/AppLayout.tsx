'use client'
import { Header } from '@/components/Header/Header';
import { useUI } from '@/context/ui-context';
import { Navbar } from "../../components/Navbar/Navbar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SidebarLeft } from "./sidebars/sidebar-left/SidebarLeft";
import React from "react";

export function AppLayout({
	children,
	isLogged,
	className,
 } : {
	children: React.ReactNode;
	isLogged: boolean;
	className?: string;
 }) {
	const [isMounted, setIsMounted] = React.useState(false)
	const {
		uiLayout,
		isSidebarCollapsed,
		collapseSidebar,
		expandSidebar,
		sidebarCollapsedSize,
		sidebarRef,
		sidebarMinSize,
		sidebarMaxSize,
		isRightPanelCollapsed,
		collapseRightPanel,
		expandRightPanel,
		rightPanelCollapsedSize,
		rightPanelRef,
		rightPanelMinSize,
		rightPanelMaxSize,
		device,
	} = useUI();

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null;

	return (
		<SidebarProvider className="min-h-screen">
			<SidebarLeft />
			<SidebarInset className={`@container/main ${device === "mobile" ? "pb-navbar md:pb-0" : ""}`}>
				<Header isLogged={isLogged} className={`hidden md:grid`}/>
				{children}
			</SidebarInset>
			{device === 'mobile' ? <Navbar className={`fixed bottom-0 left-0 z-50 md:hidden`} /> : null}
		</SidebarProvider>
	)
}