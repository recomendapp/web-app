import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film]/(default)/playlists/_components/ShowPlaylists';

export default async function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {
  return (<ShowPlaylists filmId={String(params.film)} />);
}
