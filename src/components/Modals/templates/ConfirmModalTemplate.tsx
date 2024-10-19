import { ModalType } from "@/components/Modals/Modal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useModal } from "@/context/modal-context";

export interface ConfirmModalTemplateProps extends ModalType {
	title: React.ReactNode;
	description?: React.ReactNode;
	cancelLabel?: string;
	confirmLabel?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
}

export const ConfirmModalTemplate = ({
	title,
	description,
	cancelLabel = 'Cancel',
	confirmLabel = 'Confirm',
	onConfirm,
	onCancel,
	...props
} : ConfirmModalTemplateProps) => {
	const { closeModal } = useModal();
	const handleCancel = () => {
		onCancel && onCancel();
		closeModal(props.id);
	}
	const handleConfirm = () => {
		onConfirm && onConfirm();
		closeModal(props.id);
	}
	return (
		<AlertDialog
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description && (<AlertDialogDescription>{description}</AlertDialogDescription>)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel}>{cancelLabel}</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>{confirmLabel}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
};

