import { Metadata } from 'next';
import { Map } from '@/components/Map/Map';

export const metadata: Metadata = {
  title: 'Explore',
};

export default function MapPage(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  return <Map />;
}
