import { notFound } from 'next/navigation';
import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { getPlaylist } from '@/features/server/playlist/playlistQueries';
import { Playlist } from './_components/Playlist';
import { getT } from '@/lib/i18n';

export async function generateMetadata(
    props: {
        params: Promise<{lang: string, playlist_id: number }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const { t } = await getT();
    const playlist = await getPlaylist(params.playlist_id);
    if (!playlist) return {
		title: upperFirst(t('common.messages.playlist_not_found')),
	};
    return {
		title: t('pages.playlist.metadata.title', { title: playlist.title, username: playlist.user?.username! }),
		description: truncate(t('pages.playlist.metadata.description', { username: playlist.user?.username!, app: siteConfig.name }), { length: siteConfig.seo.description.limit }),
        // alternates: seoLocales(params.lang, `/playlist/${playlist.id}`),
        openGraph: {
            siteName: siteConfig.name,
            title: `${t('pages.playlist.metadata.title', { title: playlist.title, username: playlist.user?.username! })} • ${siteConfig.name}`,
            description: truncate(t('pages.playlist.metadata.description', { username: playlist.user?.username!, app: siteConfig.name }), { length: siteConfig.seo.description.limit }),
            url: `${siteConfig.url}/${params.lang}/playlist/${playlist.id}`,
            images: playlist.poster_url ? [
                { url: playlist.poster_url },
            ] : undefined,
            type: 'video.other',
            locale: params.lang,
        },
	};
}

export default async function PlaylistPage(
    props: {
        params: Promise<{lang: string, playlist_id: number }>;
    }
) {
    const params = await props.params;
    const playlist = await getPlaylist(params.playlist_id);
    if (!playlist) notFound();
    return <Playlist playlist={playlist} />;
};

