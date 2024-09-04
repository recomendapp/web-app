export const getType = (obj: any) => {
	// USER
	if ('username' in obj && 'full_name' in obj) return ('user');
	// FRIENDS
	else if ('friend' in obj) return ('user_riend');
	// PLAYLIST
	else if ('user_id' in obj && 'title' in obj && 'description' in obj && 'private' in obj && 'poster_url' in obj && 'featured' in obj) return ('playlist');
	// PLAYLIST_GUEST
	else if ('playlist_id' in obj && 'user_id' in obj && 'created_at' in obj && 'edit' in obj) return ('playlist_guest');
	// PLAYLIST_ITEM
	else if ('comment' in obj && 'created_at' in obj && 'movie_id' in obj && 'playlist_id' in obj && 'rank' in obj && 'user_id' in obj) return ('playlist_item');
	// TMDB_MOVIE
	else if ('adult' in obj && 'backdrop_path' in obj && 'budget' in obj && 'homepage' in obj && 'imdb_id' in obj && 'original_language' in obj && 'original_title' in obj && 'popularity' in obj && 'release_date' in obj && 'revenue' in obj && 'runtime' in obj && 'status' in obj && 'vote_average' in obj && 'vote_count' in obj) return ('tmdb_movie');
	// TMDB_MOVIE_TRANSLATION
	else if ('movie_id' in obj && 'overview' in obj && 'poster_path' in obj && 'title' in obj) return ('tmdb_movie_translation');
	// USER_MOVIE_ACTIVITY
	else if ('created_at' in obj && 'date' in obj && 'is_liked' in obj && 'movie_id' in obj && 'rating' in obj && 'user_id' in obj) return ('user_movie_activity');
	// USER_MOVIE_GUIDELIST_ITEM
	else if ('created_at' in obj && 'guidelist_id' in obj && 'user_id' in obj && 'comment' in obj) return ('user_movie_guidelist_item');
	// USER_MOVIE_REVIEW
	else if ('body' in obj && 'created_at' in obj && 'movie_id' in obj && 'title' in obj && 'user_id' in obj) return ('user_movie_review');
	// USER_FOLLOWER
	else if ('followee_id' in obj && 'user_id' in obj) return ('user_follower');
	
	return undefined;
};
