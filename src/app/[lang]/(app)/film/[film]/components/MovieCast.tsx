import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { GetMovieCastingQuery, TmdbMovieCreditFragment } from "@/graphql/__generated__/graphql";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

// GRAPHQL
import { useQuery } from "@apollo/client";
import GET_MOVIE_CASTING from "@/graphql/Movie/queries/GetMovieCasting";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCast({
	movieId,
} : {
	movieId: string,
}) {

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: castQuery,
		loading,
		fetchMore,
	} = useQuery<GetMovieCastingQuery>(GET_MOVIE_CASTING, {
		variables: {
		  movieId: movieId,
		  first: numberOfResult,
		},
		skip: !movieId,
	});
	const persons = castQuery?.tmdb_movie_creditsCollection?.edges;
	const pageInfo = castQuery?.tmdb_movie_creditsCollection?.pageInfo;

	useEffect(() => {
		if (inView && pageInfo?.hasNextPage) {
		  fetchMore({
			variables: {
				movieId: movieId,
				first: numberOfResult,
				after: pageInfo?.endCursor,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
			  return {
				...previousResult,
				tmdb_movie_creditsCollection: {
				  ...previousResult.tmdb_movie_creditsCollection!,
				  edges: [
					...previousResult.tmdb_movie_creditsCollection!.edges,
					...fetchMoreResult.tmdb_movie_creditsCollection!.edges,
				  ],
				  pageInfo: fetchMoreResult.tmdb_movie_creditsCollection!.pageInfo,
				},
			  };
			},
		  });
		}
	}, [fetchMore, inView, pageInfo, movieId]);

	if (!loading && !persons?.length) return (null);

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-3xl font-bold">Casting</h2>
			<ScrollArea>
			<div className="flex space-x-4 pb-4">
				{loading ? (
					Array.from({ length: numberOfResult }).map((_, index) => (
						<div key={index} className="flex flex-col items-center bg-secondary w-[150px] rounded-xl p-2 gap-2">
							<Skeleton className="w-full aspect-[3/4] rounded-md" />
							<Skeleton className="w-3/4 h-4 rounded-md" />
							<Skeleton className="w-1/2 h-4 rounded-md" />
						</div>
					))
				) : (
					persons?.map(({ node }, index) => (
						<div key={node.id} ref={index === persons.length - 1 ? ref : undefined}>
							<CastPoster credit={node} />
						</div>
					))
				)}
			</div>
			<ScrollBar orientation="horizontal" />
			</ScrollArea>
			{/* <CrewModal crew={movie.credits.crew} /> */}
		</div>
	)
}

function CastPoster({ credit }: { credit: TmdbMovieCreditFragment }) {
	return (
	  <Link
		href={'/person/' + credit.person.id}
		className="flex flex-col h-full items-center bg-secondary hover:bg-secondary-hover w-[150px] rounded-xl p-2 gap-2 text-center"
	  >
		{/* AVATAR */}
		<div className="w-full shadow-2xl">
		  <AspectRatio ratio={3 / 4}>
			<ImageWithFallback
			  src={`https://image.tmdb.org/t/p/original/${credit.person.profile_path}`}
			  alt={credit.person.name ?? ''}
			  fill
			  className="rounded-md object-cover"
			/>
		  </AspectRatio>
		</div>
		{/* NAME */}
		<div className="line-clamp-2">{credit.person.name}</div>
		<div className="line-clamp-2 text-accent-1 italic text-sm">
		  {credit.role?.character}
		</div>
	  </Link>
	);
  }