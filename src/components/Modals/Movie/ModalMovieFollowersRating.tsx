'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useModal } from "@/context/modal-context";
import { useUserMovieFollowersRating } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
  } from "@/components/ui/chart"
import { UserAvatar } from "@/components/User/UserAvatar/UserAvatar";
import UserCard from "@/components/User/UserCard/UserCard";
import ActivityIcon from "@/components/review/ActivityIcon";
import { Card } from "@/components/ui/card";

const chartConfig = {
	count: {
	  label: "Recomendeurs",
	  color: "hsl(var(--chart-1))",
	},
  } satisfies ChartConfig;

interface ModalMovieFollowersRatingProps extends ModalType {
	movieId: number;
}

export const ModalMovieFollowersRating = ({
	movieId,
	...props
  } : ModalMovieFollowersRatingProps) => {
	const { user } = useAuth();
	const { closeModal } = useModal();
	const {
		data: followersRating,
		isLoading,
		isError,
	} = useUserMovieFollowersRating({
		userId: user?.id,
		movieId: movieId,
	});

	if (followersRating === null) {
		closeModal(props.id);
		return null;
	}

	return (
		<Modal
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
		>
			<ModalHeader>
				<ModalTitle>Notes des followers</ModalTitle>
			</ModalHeader>
			<ModalBody>
				{followersRating ? (
					<div className="space-y-4">
						<ChartContainer config={chartConfig}>
							<BarChart
								accessibilityLayer
								data={Array.from({ length: 10 }, (_, i) => {
									const rating = i + 1;
									const count = followersRating.filter((item) => item.rating === rating).length;
									return { rating, count };
								})}
							>
								<CartesianGrid vertical={false} />
								<XAxis
								dataKey="rating"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								/>
								<ChartTooltip
								cursor={true}
								content={({ content, ...props }) => {
									return (
										<ChartTooltipContent
										formatter={() => {
											const ratings = followersRating.filter((item) => item.rating === props.label);
											return (
												<>
													{ratings.length ? ratings.map((item) => (
														<UserCard key={item.user_id} user={item.user} />
													)) : <span className="text-muted-foreground">Aucune note</span>}
												</>
											)
										}}
										{...props}
										/>
									)
								}}
								/>
								<Bar dataKey="count" radius={4} className=" fill-blue-500" />
							</BarChart>
						</ChartContainer>
						<ScrollArea className="h-[10vh]">
							<div className="grid grid-cols-2 gap-2">
								{followersRating.map((item) => (
									<Card key={item.user_id} className="flex items-center justify-between gap-2 p-2">
										<UserCard user={item.user} />
										<ActivityIcon
											movieId={movieId}
											rating={item.rating}
											variant="follower"
											className="w-8"
										/>
									</Card>
								))}
							</div>
						</ScrollArea>
					</div>
				) : (isLoading || followersRating === undefined) ? (
					<Skeleton className="h-[40vh]" />
				) : isError ? (
					<div className="text-muted-foreground">Une erreur s'est produite</div>
				) : (
					<div className="text-muted-foreground">Aucune note</div>
				)}
			</ModalBody>
		</Modal>
	);
};