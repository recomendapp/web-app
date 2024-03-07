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

export default function MovieReviewComments({
	reviewId,
}: {
	reviewId: number;
}) {

	const { user } = useAuth();
	const queryClient = useQueryClient();

	return (
		<div>
			Comments
		</div>
	);
}