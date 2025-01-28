import { PlaylistCreateButton } from "@/components/Playlist/Button/PlaylistCreateButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar } from "@/components/ui/sidebar";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { Icons } from "@/config/icons";
import { useAuth } from "@/context/auth-context";
import { useUserPlaylists, useUserPlaylistsInfiniteQuery } from "@/features/client/user/userQueries";
import { cn } from "@/lib/utils";
import { capitalize } from "lodash";
import { BookmarkIcon, HeartIcon, LibraryIcon, SendIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const SidebarCollectionContainerIcon = ({
	className,
	children,
	from,
	to,
} : {
	className?: string;
	children: React.ReactNode;
	from?: string;
	to?: string;
}) => {
	return (
	  <div
		style={{
		  backgroundImage: (from && to) ? `linear-gradient(to top right, ${from}, ${to})` : 'none',
		}}
		className={cn(
		  "w-12 relative overflow-hidden",
		  "aspect-square rounded-md flex items-center justify-center shrink-0 text-white",
		  className
		)}
	  >
		{children}
	  </div>
	);
}

export const SidebarLeftRoutes = () => {
	const { user } = useAuth();
	const { open } = useSidebar();
	const routesDic = useTranslations('routes');
	const common = useTranslations('common');
	const pathname = usePathname();
	const { ref, inView } = useInView();

	const routes = useMemo(
		() => [
		  {
			icon: Icons.home,
			label: routesDic('home'),
			active: pathname === '/',
			href: '/',
		  },
		  {
			icon: Icons.explore,
			label: routesDic('explore'),
			active: pathname === '/explore',
			href: '/explore',
		  },
		  {
			icon: Icons.feed,
			label: routesDic('feed'),
			active: pathname.startsWith('/feed'),
			href: '/feed',
		  },
		  {
			icon: Icons.search,
			label: routesDic('search'),
			active: pathname.startsWith('/search') || pathname.startsWith('/movie'),
			href: '/search',
		  },
		],
		[pathname, routesDic]
	);

	const collectionRoutes = useMemo(() => [
		{
			icon: <SendIcon fill="#fff" className="w-2/5 h-2/5" />,
			bgFrom: '#FBE773',
			bgTo: '#F18E43',
			label: capitalize(common('messages.my_recos')),
			active: pathname.startsWith('/collection/my-recos'),
			href: '/collection/my-recos',
		},
		{
			icon: <BookmarkIcon fill="#fff" className="w-2/5 h-2/5" />,
			bgFrom: '#39BAED',
			bgTo: '#32509e',
			label: capitalize(common('library.collection.watchlist.label')),
			active: pathname.startsWith('/collection/watchlist'),
			href: '/collection/watchlist',
		},
		{
			icon: <HeartIcon fill="#fff" className="w-2/5 h-2/5" />,
			bgFrom: '#e6619b',
			bgTo: '#e84749',
			label: capitalize(common('library.collection.likes.label')),
			active: pathname.startsWith('/collection/likes'),
			href: '/collection/likes',
		},
	], [pathname]);

	const unloggedRoutes = useMemo(() => [
		{
			icon: Icons.shop,
			label: routesDic('shop'),
			active: false,
			href: 'https://shop.recomend.app',
			target: '_blank',
		},
		{
			icon: Icons.help,
			label: routesDic('help'),
			active: false,
			href: 'https://help.recomend.app',
			target: '_blank',
		  },
		  {
			icon: Icons.about,
			label: routesDic('about'),
			active: pathname.startsWith('/about'),
			href: '/about',
			target: undefined,
		  },
	], [pathname, routesDic]);

	const {
		data: playlists,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useUserPlaylistsInfiniteQuery({
		userId: user?.id,
		filters: {
			order: 'updated_at-desc',
		}
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, playlists, fetchNextPage]);


	return (
		<>
		<SidebarGroup>
			<SidebarGroupLabel>{common('word.navigation')}</SidebarGroupLabel>
			<SidebarMenu className={`${!open ? "items-center" : ""}`}>
				{routes.map((route, i) => (
					<SidebarMenuItem key={i}>
						<SidebarMenuButton tooltip={route.label} isActive={route.active} asChild>
							<Link href={route.href}>
								<route.icon className="w-4" />
								<span className={`line-clamp-1 transition-all duration-300 ${!open ? "opacity-0 hidden" : "opacity-100"}`}>
									{route.label}
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
		<SidebarSeparator />
		<SidebarGroup className="overflow-hidden">
			{user ? (
			<SidebarMenu className={`h-full ${!open ? "items-center" : ""}`}>
				<SidebarMenuItem>
					<SidebarMenuButton tooltip={"Bibliothèque"} isActive={pathname === '/collection'} asChild>
						<div>
							<Link href="/collection" className="flex gap-2 items-center">
								<LibraryIcon className="w-4" />
								<span className={`line-clamp-1 transition-all duration-300 ${!open ? "opacity-0 hidden" : "opacity-100"}`}>{routesDic('library')}</span>
							</Link>
							{open ? <PlaylistCreateButton className="ml-auto" /> : null}
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<ScrollArea className="gap-2">
					{collectionRoutes.map((route, i) => (
						<SidebarMenuItem key={i}>
							<SidebarMenuButton tooltip={route.label} className="h-fit"  isActive={route.active} asChild>
								<Link href={route.href}>
									<SidebarCollectionContainerIcon from={route.bgFrom} to={route.bgTo} className={`${open ? "w-12" : "w-8"}`}>
										{route.icon}
									</SidebarCollectionContainerIcon>
									<span className={`line-clamp-1 transition-all duration-300 ${!open ? "opacity-0 hidden" : "opacity-100"}`}>
										{route.label}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
					{playlists?.pages[0]?.length ? (
						playlists?.pages.map((page, i) => (
							page?.map((playlist, index) => (
							<SidebarMenuItem
							key={index}
							ref={(i === playlists.pages.length - 1 && index === page.length - 1) ? ref : undefined }
							>
								<SidebarMenuButton
									tooltip={{
										children: (
											<>
												{playlist.title}
												{/* <span className="ml-4 text-muted-foreground">
													{playlist.items_count}
												</span> */}
											</>
										)
									}}
									className="h-fit"
									isActive={pathname === `/playlist/${playlist.id}`}
									asChild
								>
									<Link href={`/playlist/${playlist.id}`}>
										<SidebarCollectionContainerIcon className={`${open ? "w-12" : "w-8"}`}>
											<ImageWithFallback
												src={playlist.poster_url ?? ''}
												alt={playlist.title ?? ''}
												fill
												className='object-cover'
												type='playlist'
											/>
										</SidebarCollectionContainerIcon>
										<div className={`line-clamp-1 transition-all duration-300 ${!open ? "opacity-0 hidden" : "opacity-100"}`}>
											<p className="line-clamp-1">{playlist.title}</p>
											{/* <p className='text-muted-foreground line-clamp-1'>{common('word.film_count', { count: playlist.items_count })}</p> */}
										</div>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							))
						))
					) : null}
				</ScrollArea>
			</SidebarMenu>
			) : (
			<>
				<SidebarGroupLabel>{common('see_more')}</SidebarGroupLabel>
				<SidebarMenu className={`h-full ${!open ? "items-center" : ""}`}>
					{unloggedRoutes.map((route, i) => (
						<SidebarMenuItem key={i}>
							<SidebarMenuButton tooltip={route.label} asChild>
								<Link href={route.href} target={route.target}>
									<route.icon className="w-4" />
									<span className={`line-clamp-1 transition-all duration-300 ${!open ? "opacity-0 hidden" : "opacity-100"}`}>
										{route.label}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</>
			)}
		</SidebarGroup>
		</>
	);
};
