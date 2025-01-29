import { Media, MediaType } from "@/types/type.db";
import { string } from "zod";

const getMediaDetails = (media?: Media) => {
	return {
		...media,
		title: media?.media_type === 'movie'
			? media?.title
			: media?.media_type === 'tv_series'
			? media?.name
			: media?.media_type == 'person'
			? media?.name
			: '',
		poster_path: media?.media_type === 'movie'
			? media?.poster_path
			: media?.media_type === 'tv_series'
			? media?.poster_path
			: media?.media_type == 'person'
			? media?.profile_path
			: '',
		poster_url: media?.media_type === 'movie'
			? media?.poster_url
			: media?.media_type === 'tv_series'
			? media?.poster_url
			: media?.media_type == 'person'
			? media?.profile_url
			: '',
		poster_className: media?.media_type === 'movie'
			? 'aspect-[2/3] rounded-md'
			: media?.media_type === 'tv_series'
			? 'aspect-[2/3] rounded-md'
			: media?.media_type === 'person'
			? 'aspect-[1/1] rounded-full'
			: 'aspect-[2/3] rounded-md',
		backdrop_path: media?.media_type === 'movie'
			? media?.backdrop_path
			: media?.media_type === 'tv_series'
			? media?.backdrop_path
			: media?.media_type == 'person'
			? media?.backdrop_path
			: '',
		url: media?.url ?? '',
		mainCredits: media?.media_type === 'movie'
			? media?.directors
			: media?.media_type === 'tv_series'
			? media?.created_by
			: undefined,
		date: media?.media_type === 'movie'
			? media?.release_date
			: media?.media_type === 'tv_series'
			? media?.first_air_date
			: undefined,
	}

};

const getMediaUrlPrefix = (type: MediaType) => {
	switch (type) {
		case 'movie':
			return '/film';
		case 'tv_series':
			return '/tv_series';
		case 'person':
			return '/person';
		default:
			return '';
	}
}

const getMediaUrl = ({ id, type, slug }: { id?: number; type?: MediaType; slug?: string | null }) => {
	if (!id || !type) return '';
	return `${getMediaUrlPrefix(type)}/${slug ?? id}`;
}

export {
	getMediaDetails,
	getMediaUrl,
	getMediaUrlPrefix,
};