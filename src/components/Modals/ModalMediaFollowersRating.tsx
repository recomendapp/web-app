'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalType } from "./Modal";
import { useModal } from "@/context/modal-context";
import { useUserFollowersRatingQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
  } from "@/components/ui/chart"
import { Card } from "@/components/ui/card";
import { IconMediaRating } from "../Media/icons/IconMediaRating";
import { CardUser } from "../Card/CardUser";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

const chartConfig = {
	count: {
	  label: "Recomendeurs",
	  color: "hsl(var(--chart-1))",
	},
  } satisfies ChartConfig;

interface ModalMediaFollowersRatingProps extends ModalType {
	mediaId: number;
}

export const ModalMediaFollowersRating = ({
	mediaId,
	...props
  } : ModalMediaFollowersRatingProps) => {
	const { user } = useAuth();
	const t = useTranslations();
	const { closeModal } = useModal();
	const {
		data: followersRating,
		isLoading,
		isError,
	} = useUserFollowersRatingQuery({
		userId: user?.id,
		mediaId: mediaId,
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
				<ModalTitle>{upperFirst(t('common.messages.followers_ratings'))}</ModalTitle>
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
														item.user ? <CardUser key={item.user_id} user={item.user} variant="inline" /> : null
													)) : <span className="text-muted-foreground">{upperFirst(t('common.messages.no_rating'))}</span>}
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
										{item.user ? <CardUser user={item.user} variant="inline" /> : null}
										<IconMediaRating
										rating={item.rating}
										variant="follower"
										className="w-8"
										disableTooltip
										/>
									</Card>
								))}
							</div>
						</ScrollArea>
					</div>
				) : (isLoading || followersRating === undefined) ? (
					<Skeleton className="h-[40vh]" />
				) : isError ? (
					<div className="text-muted-foreground">{upperFirst(t('common.messages.an_error_occurred'))}</div>
				) : (
					<div className="text-muted-foreground">{upperFirst(t('common.messages.no_rating'))}</div>
				)}
			</ModalBody>
		</Modal>
	);
};