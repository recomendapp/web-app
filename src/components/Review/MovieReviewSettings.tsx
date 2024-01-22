import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext/auth-context';
import { Review } from '@/types/type.review';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import DELETE_REVIEW_MUTATION from '@/graphql/User/Movie/Review/DeleteReview';
import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';

import toast from 'react-hot-toast';
import { FilmAction } from '@/types/type.film';
import { supabase } from '@/lib/supabase/client';

// GRAPHQL
import { useMutation } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITY from "@/graphql/User/Movie/Activity/queries/GetUserMovieActivity"
import { DeleteReviewMutation, type GetUserMovieActivityQuery, type UserMovieReviewFragment } from '@/graphql/__generated__/graphql';
import { useLocale } from 'next-intl';

export function MovieReviewSettings({
  review,
}: {
  review: UserMovieReviewFragment;
}) {
  const { user } = useAuth();

  const locale = useLocale();

  const [deleteReviewMutation] = useMutation<DeleteReviewMutation>(DELETE_REVIEW_MUTATION, {
    update: (store) => {
      const userMovieActivity = store.readQuery<GetUserMovieActivityQuery>({
        query: GET_USER_MOVIE_ACTIVITY,
        variables: {
          filter: {
            movie_id: { eq: review.movie_id },
            user_id: { eq: review.user_id },
          },
          locale: locale,
        },
      });
      if (userMovieActivity) {
        store.writeQuery<GetUserMovieActivityQuery>({
          query: GET_USER_MOVIE_ACTIVITY,
          variables: {
            filter: {
              movie_id: { eq: review.movie_id },
              user_id: { eq: review.user_id },
            },
            locale: locale,
          },
          data: {
            ...userMovieActivity,
            user_movie_activityCollection: {
              ...userMovieActivity.user_movie_activityCollection!,
              edges: userMovieActivity.user_movie_activityCollection!.edges.map(
                (edge) => {
                  if (edge.node.review?.id == review.id) {
                    return {
                      ...edge,
                      node: {
                        ...edge.node,
                        review: null as any,
                      },
                    };
                  }
                  return edge;
                }
              ),
            },
          },
        });
      }
    },
  });

  const pathname = usePathname();
  const router = useRouter();

  const [open, setIsOpen] = useState(false);
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteReview = async () => {
    try {
      await deleteReviewMutation({
        variables: {
          id: review.id,
        },
      });
      setShowDeleteDialog(false);
      if (pathname == `/@${user?.username}/film/${review.movie_id}`)
        router.push(`/film/${review.movie_id}`);
      toast.success('Supprimée');
    } catch (error) {
      toast.error("Une erreur s\'est produite");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={'icon'} className="rounded-full">
            <span className="sr-only">Actions</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(!user || user.id != review.user_id) && (
            <DropdownMenuItem onSelect={() => setIsOpen(true)}>
              Signaler la critique
            </DropdownMenuItem>
          )}
          {user && user.id == review.user_id && (
            <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}
              className="text-red-600 gap-2"
            >
              <Trash2 />
              Supprimer
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signalement une critique</DialogTitle>
            <DialogDescription>
              The content filter flags text that may violate our content policy.
              It&apos;s powered by our moderation endpoint which is free to use
              to moderate your OpenAI API traffic. Learn more.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <h4 className="text-sm text-muted-foreground">
              Playground Warnings
            </h4>
            <div className="flex items-start justify-between space-x-4 pt-3">
              <Switch name="show" id="show" defaultChecked={true} />
              <Label className="grid gap-1 font-normal" htmlFor="show">
                <span className="font-semibold">
                  Show a warning when content is flagged
                </span>
                <span className="text-sm text-muted-foreground">
                  A warning will be shown when sexual, hateful, violent or
                  self-harm content is detected.
                </span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tu es sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La critique ne sera plus visible ni
              par les autres utilisateurs, ni depuis ton compte.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeleteReview}
            >
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
