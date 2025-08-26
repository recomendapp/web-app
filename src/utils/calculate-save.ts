import { Prices } from "@recomendapp/types/dist";


const calculateSave = (currentPrice: Prices, previousPrice: Prices) => {
	const currentPricePerMonth = 
		currentPrice?.interval === 'year' 
			? (currentPrice?.unit_amount ?? 0) / 12 
			: currentPrice?.unit_amount ?? 0;

	const previousPricePerMonth = 
		previousPrice?.interval === 'year'
			? (previousPrice?.unit_amount ?? 0) / 12
			: previousPrice?.unit_amount ?? 0;

	return Math.floor(
		(1 - currentPricePerMonth / previousPricePerMonth) * 100
	);
};

export {
	calculateSave
}