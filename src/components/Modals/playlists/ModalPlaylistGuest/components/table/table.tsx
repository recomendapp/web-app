import { PlaylistGuest } from "@recomendapp/types"
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { useState } from "react"
import { Columns } from "./columns"
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
import { usePlaylistGuestsDeleteMutation } from "@/api/client/mutations/playlistMutations"
import toast from "react-hot-toast"
import { useModal } from "@/context/modal-context"
import { upperFirst } from "lodash"
import { useT } from "@/lib/i18n/client"

export const PlaylistGuestTable = ({
	guests,
	playlistId,
	setView
}: {
	guests: PlaylistGuest[],
	playlistId: number,
	setView: (view: 'guests' | 'add') => void
}) => {
	const { t } = useT();
	const { createConfirmModal } = useModal()
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
	const deletePlaylistGuests = usePlaylistGuestsDeleteMutation()
	const table = useReactTable({
		data: guests,
		columns: Columns(),
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
		if (!ids.length) toast.error(upperFirst(t('common.messages.no_selected_users')))
		deletePlaylistGuests.mutate({
			ids: ids,
			playlistId: playlistId
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.deleted', { count: selectedRows.length })))
				setRowSelection({})
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')))
			}
		})
	}


	return (
		<>
		<div className="mb-4 flex items-center gap-4">
			<Input
				placeholder={upperFirst(t('common.messages.search_user', { count: 1 }))}
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
				{upperFirst(t('common.messages.add'))}
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
					colSpan={table.getAllColumns().length}
					className="h-24 text-center"
					>
						{upperFirst(t('common.messages.no_results'))}
					</TableCell>
				</TableRow>
				)}
			</TableBody>
		</Table>
		<div className=" p-4 flex items-center justify-end space-x-2">
          <p className="flex-1 text-sm text-muted-foreground">
			{t('common.messages.selection_count', {
				number: table.getFilteredSelectedRowModel().rows.length,
				total: table.getFilteredRowModel().rows.length,
				type: t('common.messages.user', { count: table.getFilteredRowModel().rows.length }),
				gender: 'male',
				count: table.getFilteredSelectedRowModel().rows.length,
			})}
          </p>
          <div className="flex items-center gap-2">
			{table.getFilteredSelectedRowModel().rows.length > 0 ? (
				<Button
					variant="outline"
					className="h-8"
					onClick={() => createConfirmModal({
						title: upperFirst(t('common.messages.are_u_sure')),
						onConfirm: handleDelete
					})}
					disabled={deletePlaylistGuests.isPending}
				>
					<Icons.delete className="h-4 w-4" />
					<span className="sr-only">{upperFirst(t('common.messages.delete'))}</span>
				</Button>
			) : null}
			</div>
        </div>
		</>
	)
}