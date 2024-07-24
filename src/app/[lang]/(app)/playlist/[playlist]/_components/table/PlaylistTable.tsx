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
import { columns } from './component/columns';
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

// GRAPHQL
import { useMutation } from '@apollo/client';
import UPDATE_PLAYLIST_ITEM from '@/graphql/Playlist/PlaylistItem/mutations/UpdatePlaylistItem';
import { UpdatePlaylistItemMutation } from '@/graphql/__generated__/graphql';
import { Playlist, PlaylistItem } from '@/types/type.db';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName: string;
  }
}

interface DataTableProps {
  playlist: Playlist;
  playlistItems: PlaylistItem[];
  setPlaylistItems: React.Dispatch<React.SetStateAction<PlaylistItem[]>>;
  isAllowedToEdit: boolean;
}

export default function PlaylistTable({
  playlist,
  playlistItems,
  setPlaylistItems,
  isAllowedToEdit
}: DataTableProps) {

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [updatePlaylistItem] = useMutation<UpdatePlaylistItemMutation>(UPDATE_PLAYLIST_ITEM);

  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const items = React.useMemo<UniqueIdentifier[]>(() => playlistItems?.map((item) => item!.id), [playlistItems]);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = React.useState();
 

  const table = useReactTable({
    data: playlistItems,
    columns,
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
        delay: 150,
        tolerance: 200,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
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
        
        const { data } = await updatePlaylistItem({
          variables: {
            id: active.id,
            rank: over?.data.current?.sortable.index + 1
          }
        })
        if (!data?.updateplaylist_itemCollection.records.length) throw new Error('Nothing updated');
      } catch (error) {
        setPlaylistItems((data) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          return arrayMove(data, newIndex, oldIndex);
        });
        toast.error("Une erreur s\'est produite");
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
            <TableContainer table={table} items={items} isAllowedToEdit={isAllowedToEdit}/>
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
          <TableContainer table={table} items={items} isAllowedToEdit={isAllowedToEdit}/>
        )}
      </div>
    </div>
  );
}

const TableContainer = ({
  table,
  items,
  isAllowedToEdit
} : {
  table: TableType<PlaylistItem>;
  items: UniqueIdentifier[];
  isAllowedToEdit: boolean;
}) => {
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
              <DraggableTableRow key={row.original?.id} row={row} isAllowedToEdit={isAllowedToEdit}/>
            ))}
          </SortableContext>
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
      </TableBody>
    </Table>
  )
}

const DraggableTableRow = ({
  row,
  isAllowedToEdit,
} : {
  row: Row<PlaylistItem>;
  isAllowedToEdit: boolean;
}) => {
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
