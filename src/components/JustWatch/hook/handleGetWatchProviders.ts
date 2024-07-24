"use server"

export const handleGetWatchProviders = async (
	id: number
) => {
	const url = `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
	const response = await fetch(url);
	const data = await response.json();

	const providers = Object.entries(data.results).reduce((acc, [country, providers]: [string, any]) => {
		const providerMap: { [providerId: string]: any } = {};

		const processProviders = (providersList: any[], type: string) => {
			providersList.forEach((provider: any) => {
				if (!providerMap[provider.provider_id]) {
					providerMap[provider.provider_id] = { ...provider, types: [type], link: providers.link };
				} else {
					providerMap[provider.provider_id].types.push(type);
				}
			});
		};

		if (providers.flatrate) processProviders(providers.flatrate, 'flatrate');
		if (providers.rent) processProviders(providers.rent, 'rent');
		if (providers.buy) processProviders(providers.buy, 'buy');

		const sortedProviders = Object.values(providerMap).sort((a, b) => a.display_priority - b.display_priority);

		acc[country] = sortedProviders;
		return acc;
	}, {} as { [key: string]: any[] });

	return (providers);
}
