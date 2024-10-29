'use client'
import { Header } from '@/components/Header/Header';
import { useUI } from '@/context/ui-context';
import { Navbar } from "../../components/Navbar/Navbar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { SidebarLeft } from "./sidebars/sidebar-left/SidebarLeft";
import React from "react";
import { SidebarRight } from './sidebars/sidebar-right/SidebarRight';

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
		sidebarOpen,
		sidebarOpenChange,
		rightPanelOpen,
		rightPanelOpenChange,
		device,
	} = useUI();

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null;
	return (
		<SidebarProvider
		open={sidebarOpen}
		onOpenChange={sidebarOpenChange}
		className="min-h-screen"
		>
			<SidebarLeft />
			<SidebarInset className={`@container/main ${device === "mobile" ? "pb-navbar md:pb-0" : ""}`}>
				<Header isLogged={isLogged} className={`${device === "mobile" ? "hidden" : ""}`} />
				{children}
			</SidebarInset>
			{/* ADD RIGHT SIDEBAR HERE */}
			<SidebarProvider
			open={rightPanelOpen}
			onOpenChange={rightPanelOpenChange}
			shortcut='p'
			// className="min-h-screen"
			noLayout
			>
				<SidebarRight />
			</SidebarProvider>
			{device === 'mobile' ? <Navbar className={`fixed bottom-0 left-0 z-50 md:hidden`} /> : null}
		</SidebarProvider>
	)
}