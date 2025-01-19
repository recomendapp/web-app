import { notFound } from 'next/navigation';
import { getSerie } from '@/data/supabase/series';
import TvSerieDetails from './_components/TvSerieDetails';

export default async function SeriePage({
  params,
}: {
  params: {
	lang: string;
	serie_id: string;
  };
}) {
	const { serie } = await getSerie(params.serie_id, params.lang);
	if (!serie) notFound();
	return <TvSerieDetails serie={serie as any} />;
}
