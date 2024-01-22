import { Metadata } from 'next';
import { Map } from '@/components/Map/Map';

export const metadata: Metadata = {
  title: 'Map',
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
