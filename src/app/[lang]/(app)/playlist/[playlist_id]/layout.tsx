import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';
import { getPlaylist } from './getPlaylist';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';

export async function generateMetadata(
    props: {
        params: Promise<{lang: string, playlist_id: number }>;
    }
) {
    const params = await props.params;
    const common = await getTranslations({ locale: params.lang, namespace: 'common' });
    const t = await getTranslations({ locale: params.lang, namespace: 'pages' });
    const playlist = await getPlaylist(params.playlist_id);
    if (!playlist) return {
		title: upperFirst(common('errors.playlist_not_found')),
	};
    return {
		title: t('playlist.metadata.title', { title: playlist.title, username: playlist.user?.username }),
		description: t('playlist.metadata.description', { username: playlist.user?.username, app: siteConfig.name }),
	};
}

export default async function PlaylistLayout(
    props: {
        children: ReactNode;
        params: Promise<{lang: string, playlist_id: number }>;
    }
) {
    const params = await props.params;

    const {
        children
    } = props;

    const playlist = await getPlaylist(params.playlist_id);
    if (!playlist) notFound();
    return <>{children}</>;
};

