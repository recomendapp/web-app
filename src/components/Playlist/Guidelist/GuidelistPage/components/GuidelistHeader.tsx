import { UserMovieGuidelistFragment } from "@/graphql/__generated__/graphql";

export function GuidelistHeader({ guidelist }: { guidelist: { node: UserMovieGuidelistFragment }[] }) {
  
  const randomBackdrop = (object: { node: UserMovieGuidelistFragment }[]) => {
    const itemsWithBackdrop = object.filter(
      ({ node }) => node.movie.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex].node.movie.backdrop_path;
  };

  return (
    <div
      style={{
        backgroundImage: `${
          guidelist.length! > 0
            ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(guidelist)}`
            : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"
        }`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${guidelist.length! > 0 ? 'top' : 'center'}`,
        height: 'clamp(340px,30vh,400px)',
      }}
    >
      <div className="w-full h-full flex flex-col justify-center p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
        <h2 className="text-6xl font-bold text-accent-1">Guidelist</h2>
        <p className="text-muted-foreground">
          {guidelist.length} film
          {guidelist.length! > 1 && 's'}
        </p>
      </div>
    </div>
  );
}
