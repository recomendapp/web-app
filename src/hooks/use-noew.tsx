'use client'

import { useEffect, useState } from 'react';

export function useNow(options?: { updateInterval?: number }) {
	const { updateInterval = 0 } = options || {};

	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		if (!updateInterval) return;

		const id = setInterval(() => {
		setNow(new Date());
		}, updateInterval);

		return () => clearInterval(id);
	}, [updateInterval]);

	return now;
}
