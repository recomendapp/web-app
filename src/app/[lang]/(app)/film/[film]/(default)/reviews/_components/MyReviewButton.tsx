import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase/client";
import { UserMovieActivity } from "@/types/type.db";
import { useQuery } from "@tanstack/react-query";
import { FileEdit } from "lucide-react";
import Link from "next/link";

export function MyReviewButton({ filmId }: { filmId: number }) {
	const { user } = useAuth();
  
	const {
	  data: activity,
	  isLoading,  
	} = useQuery({
	  queryKey: ['user', user?.id, 'activity', { filmId }],
	  queryFn: async () => {
		if (!user?.id || !filmId) throw Error('Missing profile id or locale or movie id');
		const { data, error } = await supabase
		  .from('user_movie_activity')
		  .select(`*, review:user_movie_review(*)`)
		  .eq('user_id', user.id)
		  .eq('movie_id', filmId)
		  .returns<UserMovieActivity[]>()
		  .maybeSingle()
		if (error) throw error;
		return data;
	  },
	  enabled: !!user?.id && !!filmId,
	});
  
	if (!user || isLoading || activity === undefined) return;
  
	if (!isLoading && !activity?.review)
	  return (
		<Link
		  href={`/film/${filmId}/review/create/`}
		  className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
		>
		  <FileEdit />
		  Écrire une critique
		</Link>
	  );
  
	return (
	  <Link
		href={`/film/${filmId}/review/${activity?.review?.id}`}
		className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
	  >
		<FileEdit />
		Ma critique
	  </Link>
	);
  }