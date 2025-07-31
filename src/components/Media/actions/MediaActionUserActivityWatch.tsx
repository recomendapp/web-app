import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserActivityQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserActivityDeleteMutation, useUserActivityInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { useModal } from "@/context/modal-context";

interface MediaActionUserActivityWatchProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
    stopPropagation?: boolean;
	}

const MediaActionUserActivityWatch = React.forwardRef<
	HTMLDivElement,
	MediaActionUserActivityWatchProps
>(({ mediaId, stopPropagation = true, className, ...props }, ref) => {
	const { user } = useAuth();
  const { createConfirmModal } = useModal();
  const t = useTranslations();
	const pathname = usePathname();
	const {
		data: activity,
		isLoading,
		isError,
	} = useUserActivityQuery({
		userId: user?.id,
		mediaId: mediaId,
	});
	const insertActivity = useUserActivityInsertMutation();
	const deleteActivity = useUserActivityDeleteMutation();

	const handleInsertActivity = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation && e?.stopPropagation();
    if (activity || !user?.id) return;
    await insertActivity.mutateAsync({
      userId: user?.id,
      mediaId: mediaId,
    }), {
      onError: () => {
        toast.error(upperFirst(t('common.messages.an_error_occurred')));
      }
    };
  };

	const handleDeleteActivity = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation && e?.stopPropagation();
    if (!activity) return;
      await deleteActivity.mutateAsync({
        activityId: activity.id,
      }), {
        onError: () => {
          toast.error(upperFirst(t('common.messages.an_error_occurred')));
        }
      };
  };

	if (user === null) {
    return (
      <TooltipBox tooltip={upperFirst(t('common.messages.please_login'))}>
        <Button
          size="icon"
          variant={'action'}
          className={cn(`rounded-full hover:text-foreground`, className)}
          asChild
          {...props}
        >
          <Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <div
              className={`transition border-2 rounded-full p-[0.5px] border-foreground hover:border-blue-500 hover:text-blue-500`}
            >
              <Icons.check />
            </div>
          </Link>
        </Button>
      </TooltipBox>
    );
  }

	return (
		<TooltipBox tooltip={activity ? upperFirst(t('common.messages.remove_from_watched')) : upperFirst(t('common.messages.mark_as_watched'))}>
			<Button
      onClick={(e) => {
        e.stopPropagation();
        activity
        ? createConfirmModal({
          title: upperFirst(t('common.messages.remove_from_watched')),
          description: t('components.media.actions.watch.remove_from_watched.description'),
          onConfirm: () => handleDeleteActivity(),
        })
        : handleInsertActivity()
      }}
      disabled={isLoading || isError || activity === undefined || insertActivity.isPending || deleteActivity.isPending}
      size="icon"
      variant={'action'}
      className={cn('rounded-full', className)}
      {...props}
      >
        {(isLoading || activity === undefined) ? (
          <Icons.spinner className="animate-spin" />
        ) : isError ? (
          <AlertCircleIcon />
        ) : (
          <div
          className={`
            transition border-2 rounded-full p-[0.5px] hover:border-blue-500
            ${activity ? 'bg-blue-500 border-blue-500' : 'text-foreground border-foreground hover:text-blue-500'}
          `}
          >
            <Icons.check />
          </div>
        )}
      </Button>
		</TooltipBox>
	);
});
MediaActionUserActivityWatch.displayName = 'MediaActionUserActivityWatch';

export default MediaActionUserActivityWatch;
