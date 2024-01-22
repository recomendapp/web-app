import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';

export async function generateMetadata({
	params,
}: {
	params: {lang: string, playlist: string };
}) {
	const supabase = createServerClient();
	const { data: playlist } = await supabase
		.from('playlist')
		.select('*, user(username)')
		.eq('id', params.playlist)
		.single();

	if (!playlist) {
		return {
		title: 'Playlist introuvable',
		};
	}
	return {
		title: `${playlist.title} - playlist by @${playlist.user.username}`,
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

	const supabase = createServerClient();
	const { data: playlist } = await supabase
	  .from('playlist')
	  .select('id')
	  .eq('id', params.playlist)
	  .single();
  
	if (!playlist) notFound();

	return <>{children}</>;
};

