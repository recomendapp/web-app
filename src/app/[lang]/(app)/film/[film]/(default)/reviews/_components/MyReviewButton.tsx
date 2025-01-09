import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { useSupabaseClient } from '@/context/supabase-context';
import { UserMovieActivity } from "@/types/type.db";
import { useQuery } from "@tanstack/react-query";
import { upperFirst } from "lodash";
import { FileEdit } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function MyReviewButton({ filmId }: { filmId: number }) {
	const common = useTranslations('common');
	const supabase = useSupabaseClient();
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
  
	if (!user) return;

	if (isLoading)
	  return (
		<Skeleton className="w-36 h-10 rounded-full"/>
	  );
  
	if (!isLoading && !activity?.review)
	  return (
		<Link
		  href={`/film/${filmId}/review/create/`}
		  className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
		>
		  <FileEdit />
		  {upperFirst(common('messages.write_review'))}
		</Link>
	  );
  
	return (
	  <Link
		href={`/film/${filmId}/review/${activity?.review?.id}`}
		className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center"
	  >
		<FileEdit />
		{upperFirst(common('messages.my_review', { count: 1 }))}
	  </Link>
	);
}
