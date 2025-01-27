import { CardUser } from "@/components/card/CardUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/User/UserAvatar/UserAvatar";
import { Icons } from "@/config/icons";
import { useAuth } from "@/context/auth-context";
import { useUserAcceptFollowerRequest, useUserDeclineFollowerRequest } from "@/features/client/user/userMutations";
import { useUserFolloweesInfiniteQuery, useUserFollowersRequestsQuery } from "@/features/client/user/userQueries";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { createRightPanel } from "./RightPanelUtils";

export const RightPanelSocial = () => createRightPanel({
	title: 'Social',
	component: RightPanelSocialContent,
	props: {},
	onlyAuth: true,
})

const RightPanelSocialContent = () => {
	return (
		<Tabs defaultValue="follows" className='p-2'>
			<TabsList className="grid grid-cols-2 max-w-[400px]">
			<TabsTrigger value="follows">Suivis</TabsTrigger>
			<TabsTrigger value="requests">Demandes</TabsTrigger>
			</TabsList>
			<TabsContent value="follows" className="grid gap-2">
				<RightPanelSocialFollows />
			</TabsContent>
			<TabsContent value="requests">
				<RightPanelSocialRequests />
			</TabsContent>
		</Tabs>
	);
}

const RightPanelSocialFollows = () => {
	const { user } = useAuth();
	const { ref, inView } = useInView();
	const {
		data: followees,
		isLoading,
		isError,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useUserFolloweesInfiniteQuery({
		userId: user?.id,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, followees, fetchNextPage]);

	return (
		<>
			{followees?.pages[0]?.length ? (
				<>
					{followees?.pages.map((page, i) => (
						page?.map(({ followee }, index) => (
							<CardUser
							key={index}
							user={followee}
							{...(i === followees.pages.length - 1 &&
								index === page.length - 1
									? { ref: ref }
									: {})}
							/>
						))
					))}
					{(isFetchingNextPage) ? (
						<Icons.loader className='w-8 h-8 mx-auto' />
					) : null}
				</>
			) : (isLoading || followees === undefined) ? (
				<Icons.loader className='w-8 h-8 mx-auto' />
			) : isError ? (
				<div className='text-center text-muted-foreground'>Une erreur s'est produite</div>
			) : (
				<div className='text-center text-muted-foreground'>Aucun suivi</div>
			)}
		</>
	);
}

const RightPanelSocialRequests = () => {
	const { user } = useAuth();
	const {
		data: requests,
		isLoading,
		isError,
	} = useUserFollowersRequestsQuery({
		userId: user?.id,
	});

	const acceptRequest = useUserAcceptFollowerRequest({
		userId: user?.id,
	});
	const declineRequest = useUserDeclineFollowerRequest({
		userId: user?.id,
	});

	const handleAcceptRequest = (requestId: number) => {
		acceptRequest.mutate({
			requestId,
		}, {
			onSuccess: () => {
				toast.success('Demande acceptée');
			},
			onError: () => {
				toast.error("Une erreur s'est produite");
			}
		});
	};

	const handleDeclineRequest = (requestId: number) => {
		declineRequest.mutate({
			requestId,
		}, {
			onSuccess: () => {
				toast.success('Demande refusée');
			},
			onError: () => {
				toast.error("Une erreur s'est produite");
			}
		});
	};

	return (
		<>
			{requests?.length ? (
				<>
					{requests?.map(({ id, user }, index) => (
						<Card
						className={"flex flex-col rounded-xl bg-muted hover:bg-muted-hover p-1"}
						>
							<div className="flex items-center p-1">
								<UserAvatar username={user?.username} avatar_url={user?.avatar_url} />
								<div className='px-2 py-1 space-y-1'>
									<p className='line-clamp-2 break-words'>{user?.username}</p>
									<p className="text-muted-foreground">@{user?.username}</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<Button variant="accent-1" onClick={() => handleAcceptRequest(id)}>Accepter</Button>
								<Button variant="outline" onClick={() => handleDeclineRequest(id)}>Refuser</Button>
							</div>
						</Card>
					))}
				</>
			) : (isLoading || requests === undefined) ? (
				<Icons.loader className='w-8 h-8 mx-auto' />
			) : isError ? (
				<div className='text-center text-muted-foreground'>Une erreur s'est produite</div>
			) : (
				<div className='text-center text-muted-foreground'>Aucune demande</div>
			)}
		</>
	);



}