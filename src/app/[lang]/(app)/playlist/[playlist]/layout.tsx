import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';
import { getPlaylist } from './getPlaylist';

export async function generateMetadata({
	params,
}: {
	params: {lang: string, playlist: string };
}) {
	const playlist = await getPlaylist(params.playlist);
	if (!playlist) return {
		title: 'Playlist introuvable',
	};
	return {
		title: `${playlist.title} - playlist by @${playlist.user?.username}`,
		description: `${playlist.description}`,
	};
}

export default async function PlaylistLayout({
	children,
	params,
} : {
	children: ReactNode;
	params: {lang: string, playlist: string };
}) {
	const playlist = await getPlaylist(params.playlist);
	if (!playlist) notFound();
	return <>{children}</>;
};

