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

import { DataTableToolbar } from "./component/data-table-toolbar"

import { columns } from "./component/columns"
import { useMediaQuery } from "react-responsive"

import { DndContext, DragEndEvent, UniqueIdentifier, closestCenter, useDraggable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { useAuth } from "@/context/AuthContext/AuthProvider"
import { Playlist, PlaylistItem } from "@/types/type.playlist"
import { range } from "lodash"

import { supabase } from "@/lib/supabase/supabase"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    canEdit: () => boolean,
    updateComment: (rowIndex: number, value: string) => void,
    deleteItem: (itemToDelete: PlaylistItem) => void
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName: string
  }
}



interface DataTableProps {
  playlistItems: { item: PlaylistItem; }[],
  playlist: Playlist
}

export function TablePlaylist({
  playlistItems,
  playlist,
}: DataTableProps) {

  const { user } = useAuth();

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [ isDraggingDisabled, setIsDraggingDisabled ] = React.useState(true)

  const [data, setData] = React.useState(playlistItems);

  function canEdit() {
    if (playlist?.user_id === user?.id) {
      return true
    } else if (playlist?.guests.edges.some(edge => edge.guest.user_id === user?.id && edge.guest.edit)) {
      return true
    } else
      return false
  }

  React.useEffect(() => {
    playlistItems && setData(playlistItems)
  }, [playlistItems])

  React.useEffect(() => {
    playlist && user && setIsDraggingDisabled(!canEdit());
  }, [playlist, user])

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
      canEdit: () => {
        return (canEdit());
      },
      updateComment: async (rowIndex: number, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              // Accédez à la propriété `item` de l'objet row
              return {
                ...row,
                item: {
                  ...row.item,
                  comment: value,
                },
              };
            }
            return row;
          })
        );
      },
      deleteItem: async (itemToDelete: PlaylistItem) => {
        const updatedData = data.filter((item) => item.item.id !== itemToDelete.id);
      
        // Utiliser Promise.all pour attendre toutes les mises à jour asynchrones
        const updatePromises = updatedData.map(async (film) => {
          if (parseInt(film.item.rank) > parseInt(itemToDelete.rank)) {
            // Décrémenter le rank des éléments supérieurs
            film.item.rank = String(parseInt(film.item.rank) - 1);
      
            // Mettre à jour le rank dans la base de données ou le backend si nécessaire
            // Exemple d'utilisation avec supabase :
            await supabase
              .from('playlist_item')
              .update({ rank: film.item.rank })
              .eq('id', film.item.id);
          }
          return film;
        });
      
        // Attendre toutes les mises à jour avant de mettre à jour state
        const updatedItems = await Promise.all(updatePromises);
      
        // Mettre à jour state avec les données mises à jour
        setData(updatedItems);
      }
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
    try {
      const {active, over} = event;

      if(active.id === over?.id || !active || !over)
        return

      const isDown = Number(active.id) < Number(over.id);    
      let affectedRange: number[];
      if (isDown)
        affectedRange = range(Number(active.id), Number(over.id) + 1);
      else
        affectedRange = range(Number(over.id), Number(active.id));
  
      const reOrderedPlaylist = data.map(async (film) => {
          if (film.item.rank === active.id) {
            console.log('condition 1', film);
            film.item.rank = Number(over.id);
            await supabase
              .from('playlist_item')
              .update({ rank: film.item.rank })
              .eq('id', film.item.id)
            return film;
          } else if (affectedRange.includes(film.item.rank)) {
            if (isDown) {
              console.log('condition 2.1', film);
              film.item.rank = film.item.rank - 1;
              await supabase
                .from('playlist_item')
                .update({ rank: film.item.rank })
                .eq('id', film.item.id)
              return film;
            } else {
              console.log('condition 2.2', film);
              film.item.rank = film.item.rank + 1;
              await supabase
                .from('playlist_item')
                .update({ rank: film.item.rank })
                .eq('id', film.item.id)
              return film;
            }
          } else {
            console.log('condition 3', film);
            return film;
          }
      })

      const updatedPlaylist = await Promise.all(reOrderedPlaylist);

      updatedPlaylist.sort((a, b) => {
        const rankA = a.item.rank;
        const rankB = b.item.rank;
      
        if (rankA < rankB) {
          return -1;
        } else if (rankA > rankB) {
          return 1;
        } else {
          return 0;
        }
      });

      setData(updatedPlaylist)
    } catch (error) {
      console.log(error)
    }
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
              <SortableContext items={data.map((item) => ({ id: item.item.id }))} strategy={verticalListSortingStrategy}>
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