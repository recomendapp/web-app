import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext/auth-context';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GUIDELIST_QUERY from '@/components/Playlist/Guidelist/queries/guidelistQuery'

// TYPES
import { Guidelist } from '@/types/type.guidelist';

// UI
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/Film/Card/MovieCard';

export const UserMovieGuidelistWidget = () => {

	const { user } = useAuth();

	const { data: guidelistQuery, loading, error } = useQuery(GUIDELIST_QUERY, {
        variables: {
            user_id: user?.id
        },
        skip: !user
    });
    const guidelist: [ { item: Guidelist } ] = guidelistQuery?.user_movie_guidelistCollection?.edges;

	if (guidelist === undefined || loading) {
		return (
			<div className="flex flex-col gap-2">
				<div className="flex justify-between gap-4 items-center">
					<Skeleton className=' w-52 h-6'/>
					<Skeleton className=' w-24 h-6'/>
				</div>
				<div className="flex space-x-4 pb-4 overflow-hidden">
					{Array.from({ length: 10 }).map((__, i) => (
						<Skeleton key={i} className="w-36 aspect-[2/3] shrink-0 pb-2"/>
					))}
				</div>
			</div>
		)
	}

	if (guidelist && !guidelist.length)
		return (null);

	return (
		<div className=" flex flex-col gap-2">
			<div className="flex justify-between gap-4 items-center">
                <Link href={'/collection/guidelist'}>
                    <h3 className="font-semibold text-xl">Reco par vos amis</h3>
                </Link>
                <Button variant={'link'} asChild>
                    <Link href={'/collection/guidelist'}>
                        Tout afficher
                    </Link>
                </Button>
            </div>
			<ScrollArea className="rounded-md">
				<div className="flex space-x-4 pb-2">
					{guidelist?.map(({ item }) => (
						<div key={item.id} className="w-36">
							<MovieCard
                                filmId={item.film_id}
                                displayMode="grid"
                            />
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal"/>
			</ScrollArea>
		</div>
	);
};
