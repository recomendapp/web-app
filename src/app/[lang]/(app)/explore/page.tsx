import { Metadata } from 'next';
import { Experience } from '@/components/Map/THREE/Experience';

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
  return <Experience />;
}
