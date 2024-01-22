import { FilmAction, FilmRating } from '@/types/type.film';
import { User } from '@/types/type.user';

export interface Review {
  id: string;
  created_at: string;
  updated_at: string;
  movie_id: string;
  user_id: string;
  user: User;
  title: string;
  body: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  activity: FilmAction;
}
