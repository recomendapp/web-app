import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Fragment, useState } from "react"
import { useUserDiscoveryInfinite } from "@/features/user/userQueries"
import UserCard from "../User/UserCard/UserCard"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select"
import { CardUser } from "../card/CardUser"
import { useTranslations } from "next-intl"

export const WidgetUserDiscovery = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const [order, setOrder] = useState<'created_at-desc' | 'created_at-asc' | 'popularity-desc' | 'popularity-asc'>('created_at-desc')
	const t = useTranslations('widgets');
	const {
		data: users,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useUserDiscoveryInfinite({
		filters: {
			resultsPerPage: 20,
			order: order,
		}
	})
	if (!users || !users.pages[0].length) return null;
	return (
	<div className={cn('flex flex-col gap-4 overflow-hidden', className)}>
		<div className="flex items-center justify-between">
			<Button variant={'link'} className="p-0 w-fit font-semibold text-xl hover:text-primary hover:no-underline cursor-default">
				{t('user_discovery.label')}
			</Button>
			<Select onValueChange={(value) => setOrder(value as any)} value={order}>
				<SelectTrigger className="w-fit">
				<SelectValue />
				</SelectTrigger>
				<SelectContent align="end">
					<SelectGroup>
						<SelectLabel>Création</SelectLabel>
						<SelectItem value={'created_at-desc'}>Plus récents</SelectItem>
						<SelectItem value={'created_at-asc'}>Plus anciens</SelectItem>
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Popularité</SelectLabel>
						<SelectItem value={'popularity-desc'}>Plus populaires</SelectItem>
						<SelectItem value={'popularity-asc'}>Moins populaires</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

		</div>
		<ScrollArea className='h-full gap-2'>
			<div className="grid gap-2 h-full">
				{users.pages.map((page, index) => (
				<Fragment key={index}>
					{page.map((user, index) => (
					<CardUser key={index} user={user} />
					))}
				</Fragment>
				))}
				{hasNextPage ? <Button variant={'muted'} onClick={() => fetchNextPage()} disabled={isLoading || isFetchingNextPage}>
					Afficher plus
				</Button> : null}
			</div>
		</ScrollArea>	
	</div>
	)
}