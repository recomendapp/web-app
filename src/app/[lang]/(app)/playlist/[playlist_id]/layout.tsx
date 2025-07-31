import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';
import { getPlaylist } from './getPlaylist';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { seoLocales } from '@/lib/i18n/routing';

export async function generateMetadata(
    props: {
        params: Promise<{lang: string, playlist_id: number }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const common = await getTranslations({ locale: params.lang, namespace: 'common' });
    const t = await getTranslations({ locale: params.lang, namespace: 'pages' });
    const playlist = await getPlaylist(params.playlist_id);
    if (!playlist) return {
		title: upperFirst(common('messages.playlist_not_found')),
	};
    return {
		title: t('playlist.metadata.title', { title: playlist.title, username: playlist.user?.username }),
		description: truncate(t('playlist.metadata.description', { username: playlist.user?.username, app: siteConfig.name }), { length: siteConfig.seo.description.limit }),
        alternates: seoLocales(params.lang, `/playlist/${playlist.id}`),
        openGraph: {
            siteName: siteConfig.name,
            title: `${t('playlist.metadata.title', { title: playlist.title, username: playlist.user?.username })} • ${siteConfig.name}`,
            description: truncate(t('playlist.metadata.description', { username: playlist.user?.username, app: siteConfig.name }), { length: siteConfig.seo.description.limit }),
            url: `${siteConfig.url}/${params.lang}/playlist/${playlist.id}`,
            images: playlist.poster_url ? [
                { url: playlist.poster_url },
            ] : undefined,
            type: 'video.other',
            locale: params.lang,
        },
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
    return children;
};

