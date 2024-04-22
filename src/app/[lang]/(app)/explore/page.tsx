import { Metadata } from 'next';
import { Experience } from '@/components/Map/Experience';
// import { Map } from '@/components/Map/DeckGL/Map';
import { Map } from '@/components/Map/OLD/Map';

export const metadata: Metadata = {
  title: 'Explore',
};

export default function MapPage({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  // return <Experience />;
  return <Map />;
}
