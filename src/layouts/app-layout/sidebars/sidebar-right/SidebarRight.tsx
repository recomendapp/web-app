import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarSeparator, useSidebar } from "@/components/ui/sidebar";
import { useUI } from "@/context/ui-context";

export const SidebarRight = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	const { toggleSidebar, open } = useSidebar();
	return (
		<Sidebar
		collapsible="offcanvas"
		side="right"
		className=""
		// className="sticky hidden lg:flex top-0 h-full border-l"
		{...props}
		>
			<SidebarHeader className="h-header justify-center">
				Work in progress
				{/* <SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
						size="lg"
						className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center ${open ? "justify-start" : "justify-center"}`}
						onClick={toggleSidebar}
						>
							{open ? (
								<Icons.site.logo className={`fill-accent-1 ${open ? "w-3/4" : "w-0"}`} />
							) : (
								<Icons.site.icon className={`fill-accent-1 ${open ? "w-8" : "w-4"}`} />
							)}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu> */}
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				{/* <SidebarLeftRoutes /> */}
			</SidebarContent>
			<SidebarSeparator />
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
						onClick={toggleSidebar}
						>
							Close
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				{/* <SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex justify-center items-center"
						>
							<Link
							href={"https://oneummah.org.uk/appeals/gaza-emergency-appeal/"}
							target="_blank"
							>
								<ImageWithFallback
								src="/assets/free-palestine-min.webp"
								alt="Free Palestine"
								width={80}
								height={80}
								/>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu> */}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
