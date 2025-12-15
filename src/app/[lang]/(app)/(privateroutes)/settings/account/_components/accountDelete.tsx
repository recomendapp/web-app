import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useModal } from "@/context/modal-context";
import { useUserDeleteRequestDeleteMutation, useUserDeleteRequestInsertMutation } from "@/features/client/user/userMutations";
import { useUserDeleteRequestQuery } from "@/features/client/user/userQueries";
import { useFormatter, useT } from "@/lib/i18n/client";
import { upperFirst } from "lodash";
import toast from "react-hot-toast";

const DELETION_DELAY = 1000 * 60 * 60 * 24 * 30; // 30 days

const AccountDelete = () => {
	const { session } = useAuth();
	const formatter = useFormatter();
	const { t } = useT();
	const { createConfirmModal } = useModal();
	const {
		data,
		isLoading,
	} = useUserDeleteRequestQuery({
		userId: session?.user.id,
	});
	const loading = data === undefined || isLoading;

	const insertRequestMutation = useUserDeleteRequestInsertMutation();
	const deleteRequestMutation = useUserDeleteRequestDeleteMutation();

	// Handlers
	const handleInsertRequest = () => {
		if (!session) return;
		insertRequestMutation.mutate({
			userId: session.user.id,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.request_made')));
			},
			onError: (error) => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
	};
	const handleDeleteRequest = () => {
		if (!session) return;
		deleteRequestMutation.mutate({
			userId: session.user.id,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.request_canceled')));
			},
			onError: (error) => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
	};

	if (loading) return null;
	return (
		<div className="border-2 border-destructive rounded-md p-4 space-y-2">
			<h2 className="text-destructive text-lg font-semibold">{t('pages.settings.account.delete_account.label')}</h2>
			<p className="text-muted-foreground text-sm text-justify">
				{!data ? (
					t('pages.settings.account.delete_account.description')
				) : (
					null
					// t.rich('pages.settings.account.delete_account.deletion_requested', {
					// 	date: format.dateTime(new Date(data.delete_after)),
					// 	strong: (chunks) => <strong className="text-accent-yellow">{chunks}</strong>,
					// })
				)}
			</p>
			<Button
			variant={'destructive'}
			onClick={() => {
				if (!data) {
					createConfirmModal({
						title: upperFirst(t('common.messages.are_u_sure')),
						// description: t.rich('pages.settings.account.delete_account.confirm.description', {
						// 	date: format.dateTime(new Date(Date.now() + DELETION_DELAY)),
						// 	strong: (chunks) => <strong className="text-accent-yellow">{chunks}</strong>,
						// }),
						onConfirm: handleInsertRequest,
					})
				} else {
					handleDeleteRequest();
				}
			}}>
				{!data ? t('pages.settings.account.delete_account.button') : upperFirst(t('common.messages.cancel_request'))}
			</Button>
		</div>
	);
};

export default AccountDelete;