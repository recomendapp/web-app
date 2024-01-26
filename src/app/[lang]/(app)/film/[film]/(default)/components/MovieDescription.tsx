'use client';

import {
  TmdbMovieFragment,
} from '@/graphql/__generated__/graphql';
import MovieCast from './MovieCast';

export default function MovieDescription({
  movie,
}: {
  movie: TmdbMovieFragment;
}) {
  if (!movie) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex flex-col lg:grid grid-cols-4 gap-4"> */}
        {/* OVERVIEW */}
          {movie.data?.edges[0].node.overview &&
            <div className=" text-justify">
              {movie.data?.edges[0].node.overview}
            </div>
          }
        {/* STREAMING PLATEFORMS */}
        {/* <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Voir le film</h2>
          <div className="flex gap-2">
            <Image
              src={'https://images.justwatch.com/icon/207360008/s100'}
              className="rounded-md"
              width={25}
              height={25}
              alt={'demo'}
            />
            <Image
              src={'https://images.justwatch.com/icon/147638351/s100'}
              className="rounded-md"
              width={25}
              height={25}
              alt={'demo'}
            />
            <Image
              src={'https://images.justwatch.com/icon/52449861/s100'}
              className="rounded-md"
              width={25}
              height={25}
              alt={'demo'}
            />
          </div>
        </div> */}
      {/* </div> */}
      {/* CASTING */}
      <MovieCast movieId={movie.id} />
      {/* <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Casting</h2>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {movie.cast?.edges.map(({ node }) => (
              <CastPoster key={node.id} credit={node} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div> */}
        {/* <CrewModal crew={movie.credits.crew} /> */}
    </div>
  );
}

// function CrewModal({ crew }: { crew: any }) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="link">Équipe de tournage complète</Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="text-center">CREW</DialogTitle>
//         </DialogHeader>
//         <ScrollArea className="h-[50vh] pr-4">
//           <div className="grid grid-cols-4 gap-4">
//             {crew.map((person: any) => (
//               <CrewPoster key={person.id} person={person} />
//             ))}
//           </div>

//           <ScrollBar orientation="vertical" />
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function CrewPoster({ credit }: { credit: TmdbMovieCreditFragment }) {
//   return (
//     <Link
//       key={person.username}
//       href={'/person/' + person.id}
//       className="flex flex-col items-center bg-secondary hover:bg-secondary-hover w-[100px] rounded-xl p-2 gap-2"
//     >
//       {/* AVATAR */}
//       <div className="w-full shadow-2xl">
//         <AspectRatio ratio={3 / 4}>
//           <ImageWithFallback
//             src={'https://image.tmdb.org/t/p/original/' + person.profile_path}
//             alt={person.name}
//             fill
//             className="rounded-md object-cover"
//           />
//         </AspectRatio>
//       </div>
//       {/* NAME */}
//       <div>{person.name}</div>
//       <div className="text-accent-1 italic text-sm">{person.job}</div>
//     </Link>
//   );
// }

// function CastPoster({ credit }: { credit: TmdbMovieCreditFragment }) {
//   return (
//     <Link
//       href={'/person/' + credit.person.id}
//       className="flex flex-col items-center bg-secondary hover:bg-secondary-hover w-[150px] rounded-xl p-2 gap-2 text-center"
//     >
//       {/* AVATAR */}
//       <div className="w-full shadow-2xl">
//         <AspectRatio ratio={3 / 4}>
//           <ImageWithFallback
//             src={`https://image.tmdb.org/t/p/original/${credit.person.profile_path}`}
//             alt={credit.person.name ?? ''}
//             fill
//             className="rounded-md object-cover"
//           />
//         </AspectRatio>
//       </div>
//       {/* NAME */}
//       <div className="line-clamp-2">{credit.person.name}</div>
//       <div className="line-clamp-2 text-accent-1 italic text-sm">
//         {credit.role?.character}
//       </div>
//     </Link>
//   );
// }
