'use client';

import * as React from 'react';
import {
  ColumnFiltersState,
  Row,
  RowData,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableToolbar } from './component/data-table-toolbar';
import { Columns } from './component/columns';
import { useMediaQuery } from 'react-responsive';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

// Drag and drop
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { MouseSensor, TouchSensor } from '@/components/DragNDrop/CustomSensor';
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import { Playlist, PlaylistItem } from '@/types/type.db';
import { useSupabaseClient } from '@/context/supabase-context';
import { useMutation } from '@tanstack/react-query';
import { usePlaylistIsAllowedToEdit } from '@/features/client/playlist/playlistQueries';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName: string;
  }
}

interface DataTableProps {
  playlist: Playlist;
  playlistItems: PlaylistItem[];
  setPlaylistItems: React.Dispatch<React.SetStateAction<PlaylistItem[]>>;
}

export default function PlaylistTable({
  playlist,
  playlistItems,
  setPlaylistItems,
}: DataTableProps) {
  const supabase = useSupabaseClient();
  const common = useTranslations('common');
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(playlist?.id);
  
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const { mutateAsync: updatePlaylistItem } = useMutation({
    mutationFn: async ({ id, rank } : { id: UniqueIdentifier, rank: number }) => {
      if (!id || !rank) throw Error('Missing id or rank');
      const { error } = await supabase
        .from('playlist_items')
        .update({ rank })
        .eq('id', id as number)
      if (error) throw error;
      // return data;
    },
  });
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const items = React.useMemo<UniqueIdentifier[]>(() => playlistItems?.map((item) => item!.id), [playlistItems]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState();
 
  const table = useReactTable({
    data: playlistItems,
    columns: Columns(),
    initialState: {
      pagination: {
        pageSize: 1001,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
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
  });

  const isMobile = useMediaQuery({ maxWidth: 1024 });
  React.useEffect(() => {
    if (isMobile) {
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide()
        )
        .forEach((column) => {
          column.toggleVisibility(false);
        });
    } else {
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide()
        )
        .forEach((column) => {
          column.toggleVisibility(true);
        });
    }
  }, [isMobile, table]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 350,
        tolerance: 200,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 350,
        tolerance: 5,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id !== over?.id) {
      try {
        setPlaylistItems((data) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          return arrayMove(data, oldIndex, newIndex);
        });
        await updatePlaylistItem({
          id: active.id,
          rank: over?.data.current?.sortable.index + 1
        })
      } catch (error) {
        setPlaylistItems((data) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          return arrayMove(data, newIndex, oldIndex);
        });
        toast.error(upperFirst(common('errors.an_error_occurred')));
      }
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const rowData = table?.getRowModel().rows;

  const selectedRow = React.useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = rowData.find(({ original }) => original?.id === activeId);
    // prepareRow(row);
    return row;
  }, [activeId, rowData]);

  return (
    <div className="flex flex-col gap-2">
      <DataTableToolbar table={table} playlist={playlist} />
      <div className="rounded-md">
        {(isAllowedToEdit && !sorting.length && !globalFilter && !columnFilters.length) ? (
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
          >
            <TableContainer table={table} items={items} />
            <DragOverlay>
              {activeId && (
                <Table style={{ width: "100%" }}>
                  <TableBody>
                    <StaticTableRow row={selectedRow} />
                  </TableBody>
                </Table>
              )}
            </DragOverlay>
          </DndContext>
        ) : (
          <TableContainer table={table} items={items} />
        )}
      </div>
    </div>
  );
}

const TableContainer = ({
  table,
  items,
} : {
  table: TableType<PlaylistItem>;
  items: UniqueIdentifier[];
}) => {
  const common = useTranslations('common');
  return (
  <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <TableHead key={header.id} className={!index ? 'pr-0' : ''}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
              ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map((row) => (
              <DraggableTableRow key={row.original?.id} row={row} />
            ))}
          </SortableContext>
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
            {upperFirst(common('messages.no_results'))}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

const DraggableTableRow = ({
  row,
} : {
  row: Row<PlaylistItem>;
}) => {
  const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(row.original?.playlist_id);
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: row.original?.id!
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <TableRow ref={setNodeRef} style={style} className='group'>
      {isDragging ? (
        <TableCell className='bg-accent-1 h-28' colSpan={row.getVisibleCells().length}>&nbsp;</TableCell>
      ) : (
        row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            {...attributes}
            {...listeners}
            className={`${isAllowedToEdit ? 'cursor-grab' : 'cursor-default'}`}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))
      )}
    </TableRow>
  );
};

export const StaticTableRow = ({ row } : { row:  Row<PlaylistItem> | null | undefined}) => {
  return (
    <TableRow className='bg-background'>
      {row?.getVisibleCells().map((cell, i) => {
          if (i === 0) {
            return (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            );
          }
          return (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
      })}
    </TableRow>
  )
}
