"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  Row,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./component/data-table-pagination"
import { DataTableToolbar } from "./component/data-table-toolbar"

import { columns } from "./component/columns"
import { useMediaQuery } from "react-responsive"

import { DndContext, DragEndEvent, UniqueIdentifier, closestCenter, useDraggable } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { changeMovieRank } from "./_queries/changeMovieRank"
import { useAuth } from "@/context/AuthContext/AuthProvider"
import { PlaylistItem } from "@/types/type.playlist"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateComment: (rowIndex: number, value: string) => void
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName: string
  }
}



interface DataTableProps {
  playlist: { item: PlaylistItem; }[],
  userId: string
}

export function TablePlaylist({
  playlist,
  userId,
}: DataTableProps) {

  const { user } = useAuth();

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [ isDraggingDisabled, setisDraggingDisabled ] = React.useState(true)

  const [data, setData] = React.useState(playlist);

  React.useEffect(() => {
    playlist && setData(playlist)
  }, [playlist])

  React.useEffect(() => {
    userId == user?.id && setisDraggingDisabled(false)
  }, [userId, user])

  const [sorting, setSorting] = React.useState<SortingState>([]);
  
  const [ filtering, setFiltering ] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      updateComment: (rowIndex: number, value: string) => {
        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex],
        //         ["comment"]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
      },
    }
  })

  const isMobile = useMediaQuery({ maxWidth: 1024 });
  React.useEffect(() => {
    if (isMobile) {
      table.getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .forEach((column) => {
          column.toggleVisibility(false);
        });
    } else {
      table.getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .forEach((column) => {
          column.toggleVisibility(true);
        });
    }
  }, [isMobile, table]);

  const onDragEnd = async (event: DragEndEvent) => {
    // const {active, over} = event;

    // const newData = await changeMovieRank(data, Number(active.id), Number(over?.id))
    
    // if (newData)
    //   setData(newData)
  }

  return (
    <div className="flex flex-col gap-2">
      <DataTableToolbar table={table} />
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={data} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <SortableRow key={row.id} row={row} isDraggingDisabled={isDraggingDisabled} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Aucun résultat.
                    </TableCell>
                  </TableRow>
                )}
              </SortableContext>
            </DndContext>
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}

const SortableRow = ({ row, isDraggingDisabled } : { row: Row<PlaylistItem>, isDraggingDisabled: boolean }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
  } = useSortable({ id: row.id, disabled: isDraggingDisabled })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }


  return (
    <TableRow
      key={row.index}
      data-state={row.getIsSelected() && "selected"}
      className="group"
      ref={setNodeRef}
      style={style}
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableCell key={cell.id}  {...(index === 0 ? { ...attributes, ...listeners } : {})}>
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}