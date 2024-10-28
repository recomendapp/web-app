import { Json as JsonGenerated } from "./__generated__/type.db";

export type Json = JsonGenerated;

// *========== USER ==========* //
export type User = Database['public']['Tables']['user']['Row'] & {
	subscriptions?: UserSubscriptions[] | any;
	favorite_movies?: Movie[] | any;
} | null | undefined;

export type UserProfile = Database['public']['Views']['profile']['Row'] & {

};

// *========== USER_FRIEND ==========* //
export type UserFriend = Database['public']['Tables']['user_friend']['Row'] & {
	friend: User;
	user: User;
};

// *========== USER_MOVIE_ACTIVITY ==========* //
export type UserMovieActivity = Database['public']['Tables']['user_movie_activity']['Row'] & {
	movie?: Movie;
	user?: User;
	review?: UserMovieReview;
} | null | undefined;

// *========== USER_MOVIE_WATCHLIST ==========* //
export type UserMovieWatchlist = Database['public']['Tables']['user_movie_watchlist']['Row'] & {
	movie?: Movie;
	user?: User;
} | null | undefined;

// *========== USER_MOVIE_GUIDELIST ==========* //
export type UserMovieGuidelist = Database['public']['Tables']['user_movie_guidelist']['Row'] & {
	movie?: Movie;
	user?: User;
	sender?: User;
} | null | undefined;

export type UserMovieGuidelistView = Database['public']['Views']['guidelist']['Row'] & {
	movie?: Movie;
};

// *========== USER_MOVIE_REVIEW ==========* //
export type UserMovieReview = Database['public']['Tables']['user_movie_review']['Row'] & {
	user?: User;
} | null | undefined;

// *========== review ==========* //
export type Review = Database['public']['Views']['review']['Row'] & {
	user?: User;
	movie?: Movie;
} | null | undefined;

// *========== SUBSCRIPTION ==========* //
export type UserSubscriptions = Database['public']['Tables']['user_subscriptions']['Row'] & {
	prices?: Prices[];
} | null | undefined;

// *========== PRICES ==========* //
export type Prices = Database['public']['Tables']['prices']['Row'] & {
	product?: Products;
} | null | undefined;

// *========== PRODUCTS ==========* //
export type Products = Database['public']['Tables']['products']['Row'] & {
	prices?: Prices[];
} | null | undefined;

// *========== MOVIE ==========* //
export type Movie = Database['public']['Views']['movie']['Row'] & {
	// data?: MovieTranslation[] | any;
	// directors?: {
	// 	id: number;
	// 	gender: number;
	// 	known_for_department: string;
	// 	name: string;
	// 	profile_path: string;
	// }[] | Json[] | null;
	// genres?: {
	// 	id: number;
	// 	name: string;
	// }[] | Json[] | null;
	videos?: Database['public']['Tables']['tmdb_movie_videos']['Row'][];
	production_countries?: Database['public']['Tables']['tmdb_movie_production_countries']['Row'][];
	spoken_languages?: Database['public']['Tables']['tmdb_movie_spoken_languages']['Row'][];
	cast?: MoviePerson[];
	// directors?: MoviePerson[] | any;
} | null | undefined;

// *========== MOVIE_TRANSLATION ==========* //
export type MovieTranslation = Database['public']['Tables']['tmdb_movie_translations']['Row'] | null | undefined;

// *========== MOVIE_CREDITS ==========* //
export type MoviePerson = Database['public']['Tables']['tmdb_movie_credits']['Row'] & {
	person?: Person;
} | null | undefined;

// *========== PERSON ==========* //
// export type Person = Database['public']['Tables']['tmdb_person']['Row'] & {
// 	data?: PersonTranslation[] | any;
// } | null | undefined;
export type Person = Database['public']['Views']['person_full']['Row'] & {
} | null | undefined;

// *========== PERSON_TRANSLATION ==========* //
export type PersonTranslation = Database['public']['Tables']['tmdb_person_translation']['Row'] | null | undefined;

// *========== PLAYLIST ==========* //
export type Playlist = Database['public']['Tables']['playlist']['Row'] & {
	user?: User;
	guests?: PlaylistGuest[] | any;
	collaborators?: PlaylistGuest[] | any;
	items?: PlaylistItem[] | any;
} | null | undefined;

export type PlaylistType = 'personal' | 'shared';

// *========== PLAYLIST_ITEM ==========* //
export type PlaylistItem = Database['public']['Tables']['playlist_item']['Row'] & {
	movie?: Movie;
	playlist?: Playlist;
	user?: User;
} | null | undefined;

// *========== PLAYLIST_GUEST ==========* //
export type PlaylistGuest = Database['public']['Tables']['playlist_guest']['Row'] & {
	user?: User;
	playlist?: Playlist;
} | null | undefined;