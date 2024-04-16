import { Metadata } from 'next';
import { Map } from '@/components/Map/THREE/Map';

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
  return <Map />;
}
