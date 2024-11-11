
export const RightPanelNotifications = () => {
	return {
		title: 'Notifications',
		component: RightPanelNotificationsContent,
		props: {},
	}
}

const RightPanelNotificationsContent = () => {
	return (
		<div className="flex flex-col p-2">
			<p className="mx-auto text-muted-foreground">Work in progress...</p>
		</div>
		// <Tabs defaultValue="follows" className='p-2'>
		// 	<TabsList className="grid grid-cols-2 max-w-[400px]">
		// 	<TabsTrigger value="follows">Suivis</TabsTrigger>
		// 	<TabsTrigger value="requests">Demandes</TabsTrigger>
		// 	</TabsList>
		// 	<TabsContent value="follows" className="grid gap-2">
		// 		<RightPanelSocialFollows />
		// 	</TabsContent>
		// 	<TabsContent value="requests">
		// 		<RightPanelSocialRequests />
		// 	</TabsContent>
		// </Tabs>
	);
}