import { PlaylistGuest } from "@/types/type.db"
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { useState } from "react"
import { columns } from "./columns"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/config/icons"
import { usePlaylistGuestsDeleteMutation } from "@/features/client/playlist/playlistMutations"
import toast from "react-hot-toast"
import { useModal } from "@/context/modal-context"

export const PlaylistGuestTable = ({
	guests,
	playlistId,
	setView
}: {
	guests: PlaylistGuest[],
	playlistId: number,
	setView: (view: 'guests' | 'add') => void
}) => {
	const { createConfirmModal } = useModal()
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
	const deletePlaylistGuests = usePlaylistGuestsDeleteMutation()
	const table = useReactTable({
		data: guests,
		columns: columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
		  sorting,
		  columnFilters,
		  columnVisibility,
		  rowSelection,
		},
	})

	const handleDelete = () => {
		const selectedRows = table.getFilteredSelectedRowModel().rows
		const ids = selectedRows.map((row) => row.original?.id as number)
		if (!ids.length) toast.error('Aucun utilisateur sélectionné')
		deletePlaylistGuests.mutate({
			ids: ids,
			playlistId: playlistId
		}, {
			onSuccess: () => {
				toast.success(`Supprimé${ids.length > 1 ? 's' : ''}`)
				setRowSelection({})
			},
			onError: () => {
				toast.error('Une erreur s\'est produite')
			}
		})
	}


	return (
		<>
		<div className="mb-4 flex items-center gap-4">
			<Input
				placeholder="Search user..."
				value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
				onChange={(event) =>
				table.getColumn("user")?.setFilterValue(event.target.value)
				}
				className="max-w-sm"
			/>
			<Button
			variant={"outline"}
			onClick={() => setView("add")}
			>
				<Icons.add className="mr-2 h-4 w-4" />
				Ajouter
			</Button>
		</div>
		<Table className="bg-popover">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
					return (
						<TableHead
						key={header.id}
						className="[&:has([role=checkbox])]:pl-3"
						>
						{header.isPlaceholder
							? null
							: flexRender(
								header.column.columnDef.header,
								header.getContext()
							)}
						</TableHead>
					)
					})}
				</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => (
					<TableRow
					key={row.id}
					data-state={row.getIsSelected() && "selected"}
					>
					{row.getVisibleCells().map((cell) => (
						<TableCell
						key={cell.id}
						className="[&:has([role=checkbox])]:pl-3"
						>
						{flexRender(
							cell.column.columnDef.cell,
							cell.getContext()
						)}
						</TableCell>
					))}
					</TableRow>
				))
				) : (
				<TableRow>
					<TableCell
					colSpan={columns.length}
					className="h-24 text-center"
					>
					No results.
					</TableCell>
				</TableRow>
				)}
			</TableBody>
		</Table>
		<div className=" p-4 flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} user(s) selected.
          </div>
          <div className="flex items-center gap-2">
			{table.getFilteredSelectedRowModel().rows.length > 0 ? (
				<Button
					variant="outline"
					className="h-8"
					onClick={() => createConfirmModal({
						title: 'Delete user(s)',
						description: 'Are you sure you want to delete the selected user(s)?',
						onConfirm: handleDelete
					})}
					disabled={deletePlaylistGuests.isPending}
				>
					<Icons.delete className="h-4 w-4" />
					<span className="sr-only">Delete</span>
				</Button>
			) : null}
			</div>
        </div>
		</>
	)
}