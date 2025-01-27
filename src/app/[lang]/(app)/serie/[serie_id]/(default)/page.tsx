import { notFound } from 'next/navigation';
import { getSerie } from '@/features/server/series';
import TvSerieDetails from './_components/TvSerieDetails';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export default async function SeriePage({
  params,
}: {
  params: {
	lang: string;
	serie_id: string;
  };
}) {
	const { id: serieId } = getIdFromSlug(params.serie_id);
	const serie = await getSerie(serieId, params.lang);
	if (!serie) notFound();
	return <TvSerieDetails serie={serie} />;
}
