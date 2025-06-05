"use server";

const socialCanvas = {
	baseUrl: process.env.SOCIAL_CANVAS_URL!,
}

export const getSocialCanvas = async ({
	endpoint,
	body,
}: {
	endpoint: string;
	body?: BodyInit | null;
}) => {
	const response = await fetch(`${socialCanvas.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.SOCIAL_CANVAS_API_KEY}`,
		},
		body: body,
	});
	if (!response.ok) throw new Error(`Error fetching from Social Canvas: ${response.statusText}`);
	const contentType = response.headers.get('Content-Type') || 'image/png';
	const buffer = await response.arrayBuffer();

	return { buffer, contentType };
};