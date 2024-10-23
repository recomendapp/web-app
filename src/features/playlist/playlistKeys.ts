export const playlistKeys = {
	all: ['playlist'] as const,
	details: () => [...playlistKeys.all, 'details'] as const,
	detail: (playlistId: number) => [...playlistKeys.details(), playlistId] as const,
	items: (playlistId: number) => [...playlistKeys.detail(playlistId), 'items'] as const,
	item: (playlistId: number, itemId: number) => [...playlistKeys.items(playlistId), itemId] as const,
};