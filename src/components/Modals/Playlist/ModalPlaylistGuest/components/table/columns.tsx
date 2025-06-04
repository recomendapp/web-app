import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { UserAvatar } from "@/components/User/UserAvatar/UserAvatar"
import { useAuth } from "@/context/auth-context"
import { useUpdatePlaylistGuest } from "@/features/client/playlist/playlistMutations"
import { PlaylistGuest } from "@/types/type.db"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import toast from "react-hot-toast"

export const columns: ColumnDef<PlaylistGuest>[] = [
	{
	  id: "select",
	  header: ({ table }) => (
		<Checkbox
		  checked={
			table.getIsAllPageRowsSelected() ||
			(table.getIsSomePageRowsSelected() && "indeterminate")
		  }
		  onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
		  aria-label="Select all"
		/>
	  ),
	  cell: ({ row }) => (
		<Checkbox
		  checked={row.getIsSelected()}
		  onCheckedChange={(value) => row.toggleSelected(!!value)}
		  aria-label="Select row"
		/>
	  ),
	  enableSorting: false,
	  enableHiding: false,
	},
	{
	  accessorKey: "user",
	  accessorFn: (row) => row?.user?.username,
	  header: ({ column }) => {
		return (
		  <Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		  >
			User
			<CaretSortIcon className="ml-2 h-4 w-4" />
		  </Button>
		)
	  },
	  cell: ({ row }) => (
		<div className="flex items-center">
			{row.original?.user?.username ? <UserAvatar avatarUrl={row.original?.user?.avatar_url} username={row.original?.user?.username} /> : null}
			<div className="ml-2">
			<p className="text-sm font-medium leading-none line-clamp-1">
				{row.original?.user?.full_name}
			</p>
			<p className="text-sm text-muted-foreground line-clamp-1">
				@{row.original?.user?.username}
			</p>
			</div>
		</div>
	  ),
	},
	{
		id: "can_edit",
	 	accessorKey: "Can Edit",
		header: () => <div className="text-right">Edit</div>,
		cell: ({ row }) => (
			<div className="text-right">
				<EditSwitch id={row.original?.id} playlistId={row.original?.playlist_id} editSate={row.original?.edit} />
			</div>
		),
	},
  ]

const EditSwitch = ({
	id,
	playlistId,
	editSate,
}: {
	id?: number;
	playlistId?: number;
	editSate?: boolean;
}) => {
	const { user } = useAuth()
	const updatePlaylistGuest = useUpdatePlaylistGuest()
	const [edit, setEdit] = useState(editSate);

	const handleEdit = (value: boolean) => {
		if (!playlistId || !id) return null;
		updatePlaylistGuest.mutate({
			id: id,
			playlistId: playlistId,
			edit: value,
		}, {
			onSuccess: () => {
				setEdit(value)
			},
			onError: () => {
				setEdit(!value)
				toast.error('Une erreur s\'est produite');
			}
		})
	}
	return (
	<Switch
		checked={edit}
		onCheckedChange={handleEdit}
		disabled={!user?.premium && !edit}
	/>
	)
}