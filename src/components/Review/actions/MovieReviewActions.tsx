import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// COMPONENTS
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
  } from '@/components/ui/tooltip';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircleIcon, HeartIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import UserMovieReviewLike from "./UserMovieReviewLike";
import ButtonShare from "@/components/utils/ButtonShare";

export default function MovieReviewActions({
	reviewId,
}: {
	reviewId: number;
}) {
	return (
		<div>
			<UserMovieReviewLike reviewId={reviewId} />
			{/* <ButtonShare icon url={`${location.origin}/film/${data?.movie_id}`} /> */}
		</div>
	);
}