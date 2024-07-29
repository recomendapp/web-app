
// *========== USER ==========* //
export type User = Database['public']['Tables']['user']['Row'] & {
	subscriptions?: Subscriptions[] | any;
	favorite_movies?: Movie[] | any;
} | null | undefined;

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

export type UserMovieGuidelistView = Database['public']['Views']['user_movie_guidelist_view']['Row'] & {
	movie?: Movie;
	user?: User;
};

// *========== USER_MOVIE_REVIEW ==========* //
export type UserMovieReview = Database['public']['Tables']['user_movie_review']['Row'] & {
	user?: User;
} | null | undefined;

// *========== SUBSCRIPTION ==========* //
export type Subscriptions = Database['public']['Tables']['subscriptions']['Row'] & {
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
export type Movie = Database['public']['Views']['movies']['Row'] & {
	// data?: MovieTranslation[] | any;
	directors?: MoviePerson[] | any;
} | null | undefined;

// *========== MOVIE_TRANSLATION ==========* //
export type MovieTranslation = Database['public']['Tables']['tmdb_movie_translation']['Row'] | null | undefined;

// *========== MOVIE_CREDITS ==========* //
export type MoviePerson = Database['public']['Tables']['tmdb_movie_credits']['Row'] & {
	person?: Person;
} | null | undefined;

// *========== PERSON ==========* //
export type Person = Database['public']['Tables']['tmdb_person']['Row'] & {
	data?: PersonTranslation[] | any;
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