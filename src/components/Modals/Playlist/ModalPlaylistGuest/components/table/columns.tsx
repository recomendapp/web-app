import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { UserAvatar } from "@/components/User/UserAvatar/UserAvatar"
import UserCard from "@/components/User/UserCard/UserCard"
import { useUpdatePlaylistGuest } from "@/features/playlist/playlistMutations"
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
				<UserAvatar avatar_url={row.original?.user?.avatar_url} username={row.original?.user?.username} />
				<div className="ml-2">
				<p className="text-sm font-medium leading-none line-clamp-1">
					{row.original?.user?.full_name}
				</p>
				<p className="text-sm text-muted-foreground line-clamp-1">
					@{row.original?.user?.username}
				</p>
				</div>
			</div>
		// <UserCard user={row.original?.user} />
	  ),
	},
	{
		id: "can_edit",
	 	accessorKey: "Can Edit",
		header: () => <div className="text-right">Edit</div>,
		cell: ({ row }) => {
			const updatePlaylistGuest = useUpdatePlaylistGuest()
			const [edit, setEdit] = useState(row.original?.edit);

			const handleEdit = (value: boolean) => {
				if (!row.original?.playlist_id || !row.original?.user_id) return null;
				updatePlaylistGuest.mutate({
					id: row.original.id,
					playlistId: row.original?.playlist_id,
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
			<div className="text-right">
				<Switch
					checked={edit}
					onCheckedChange={handleEdit}
				/>
			</div>
			)
		},
	},
	// {
	//   id: "actions",
	//   enableHiding: false,
	//   cell: ({ row }) => (
	// 	  <DropdownMenu>
	// 		<DropdownMenuTrigger asChild className="text-right">
	// 		  <Button variant="ghost" className="h-8 w-8 p-0">
	// 			<span className="sr-only">Open menu</span>
	// 			<DotsHorizontalIcon className="h-4 w-4" />
	// 		  </Button>
	// 		</DropdownMenuTrigger>
	// 		<DropdownMenuContent align="end">
	// 		  <DropdownMenuLabel>Actions</DropdownMenuLabel>
	// 		  <DropdownMenuItem
	// 			onClick={() => navigator.clipboard.writeText(payment.id)}
	// 		  >
	// 			Copy payment ID
	// 		  </DropdownMenuItem>
	// 		  <DropdownMenuSeparator />
	// 		  <DropdownMenuItem>View customer</DropdownMenuItem>
	// 		  <DropdownMenuItem>View payment details</DropdownMenuItem>
	// 		</DropdownMenuContent>
	// 	  </DropdownMenu>
	//   ),
	// },
  ]