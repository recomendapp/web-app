'use client'
import { setCookie } from "cookies-next";
import { Box } from '@/components/Box/Box';
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useUiContext } from '@/context/ui-context';
import { cn } from '@/lib/utils';
import RightSidebar from "../RightSidebar/RightSidebar";

export default function AppLayout({
	children,
	header,
	className,
 } : {
	children: React.ReactNode
	header: React.ReactNode
	className?: string
 }) {
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
	} = useUiContext()

	return (
		<div className={cn('', className)}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={(sizes: number[]) => {
					setCookie("ui:layout", JSON.stringify(sizes), {
						path: "/",
					});
				}}
				className='h-full items-stretch gap-1'
			>
				{/* SIDEBAR */}
				<ResizablePanel
					ref={sidebarRef}
					defaultSize={uiLayout[0]}
					collapsedSize={sidebarCollapsedSize}
					collapsible={true}
					minSize={sidebarMinSize}
					maxSize={sidebarMaxSize}				
					onCollapse={collapseSidebar}
					onExpand={expandSidebar}
					className={cn('hidden lg:flex',isSidebarCollapsed && "min-w-[70px] transition-all duration-300 ease-in-out gap-0")}
				>
					<Sidebar />
				</ResizablePanel>
				<ResizableHandle withHandle className='hidden lg:flex bg-transparent hover:bg-accent-1 transition-colors'/>
				{/* MAIN */}
				<ResizablePanel
					defaultSize={uiLayout[1]}
					minSize={50}
				>
					<Box className="h-full overflow-auto p-0">
						{header}
						<div
							className="flex-grow relative lg:pb-0
								h-full
								lg:h-[calc(100%-(var(--height-header)))]
							"
						>
							{children}
						</div>
					</Box>
				</ResizablePanel>
				{!isRightPanelCollapsed && <ResizableHandle withHandle className='hidden lg:flex bg-transparent hover:bg-accent-1 transition-colors'/>}
				{/* RIGHTPANEL */}
				<ResizablePanel
					ref={rightPanelRef}
					defaultSize={uiLayout[2]}
					collapsedSize={rightPanelCollapsedSize}
					collapsible={true}
					minSize={rightPanelMinSize}
					maxSize={rightPanelMaxSize}
					onCollapse={collapseRightPanel}
					onExpand={expandRightPanel}
					className='hidden lg:flex'
				>
					<RightSidebar />
				</ResizablePanel>
				
			</ResizablePanelGroup>
		</div>
	);
}

// export default function RootLayout({ children }: AppLayoutProps) {
//   return (
//     <div className="h-screen w-screen flex flex-col">
//       <div
//         className={`
//                     flex
//                     h-[calc(100%-(var(--height-navbar)))]
//                     gap-2
//                     lg:p-2
//                     lg:h-full
//                 `}
//       >
//         <Sidebar />
//         <Box className="h-full overflow-auto p-0">
//           <Header />
//           <div
//             className="flex-grow relative lg:pb-0
//                         h-full
//                         lg:h-[calc(100%-(var(--height-header)))]
//                     "
//           >
//             {children}
//           </div>
//         </Box>
//         <RightSidebar />
//       </div>
//       <Navbar className=" z-[50] fixed w-full bottom-0 lg:hidden h-navbar" />
//     </div>
//   );
// }
