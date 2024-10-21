import UserMovieReviewLike from "./UserMovieReviewLike";

export default function MovieReviewActions({
	reviewId,
}: {
	reviewId: number;
}) {
	return (
		<div>
			<UserMovieReviewLike reviewId={reviewId} />
			{/* <ButtonShare icon url={`${location.origin}/film/${data?.movie_id}`} /> */}
		</div>
	);
}