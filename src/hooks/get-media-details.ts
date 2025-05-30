import { Media, MediaType } from "@/types/type.db";

const getMediaDetails = (media?: Media) => {
	return {
		...media,
		poster_className: media?.media_type === 'movie'
			? 'aspect-[2/3] rounded-md'
			: media?.media_type === 'tv_series'
			? 'aspect-[2/3] rounded-md'
			: media?.media_type === 'person'
			? 'aspect-[1/1] rounded-full'
			: 'aspect-[2/3] rounded-md',
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