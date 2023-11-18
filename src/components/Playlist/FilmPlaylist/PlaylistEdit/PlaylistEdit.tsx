'use client';

import MovieCard from '@/components/Film/Card/MovieCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext/auth-context';
import { supabase } from '@/lib/supabase/supabase';
import { PlaylistItem } from '@/types/type.playlist';
import { DndContext, DragEndEvent, PointerSensor, Sensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { range } from 'lodash';
import { XCircle } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PlaylistEditComment from './components/PlaylistEditComment';
import { MouseSensor, TouchSensor } from './components/CustomSensor';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function PlaylistEdit({
  playlistId,
  serverPlaylistItems,
}: {
  playlistId: string;
  serverPlaylistItems: PlaylistItem[];
}) {
    const { user } = useAuth();

    const [ playlistItems, setPlaylistItems ] = useState(serverPlaylistItems)

    useEffect(() => {
        const playlistItemsChanges = supabase
            .channel(playlistId)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'playlist_item',
                    filter: `playlist_id=eq.${playlistId}`
                },
                (payload) => {
                    console.log('NEW CHANGES', payload);
                    const updatedPlaylistItems = [...playlistItems];
                    if (payload.eventType === 'INSERT') {
                        updatedPlaylistItems.push(payload.new as PlaylistItem);
                    } else if (payload.eventType === 'DELETE') {
                        const deletedItemId = payload.old.id;
                        const indexToDelete = updatedPlaylistItems.findIndex(item => item.id === deletedItemId);
                        if (indexToDelete !== -1) {
                            updatedPlaylistItems.splice(indexToDelete, 1);
                        }
                    } else if (payload.eventType === 'UPDATE') {
                        const updatedItemId = payload.new.id;
                        const itemToUpdate = updatedPlaylistItems.find(item => item.id === updatedItemId);
                        if (itemToUpdate) {
                            Object.assign(itemToUpdate, payload.new);
                        }
                      }
                      updatedPlaylistItems.sort((a, b) => a.rank - b.rank);
                      setPlaylistItems(updatedPlaylistItems);
                }
            )
            .subscribe()

            return () => {
                supabase.removeChannel(playlistItemsChanges);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabase, playlistItems, setPlaylistItems])
    

    const onDragEnd = async (event: DragEndEvent) => {
        try {
            const {active, over} = event;
      
            if(active.id === over?.id || !active || !over)
              return
      
            const isDown = Number(active.id) < Number(over.id);    
            let affectedRange: number[];
            if (isDown)
              affectedRange = range(Number(active.id) + 1, Number(over.id) + 1);
            else
                affectedRange = range(Number(over.id), Number(active.id));

            const updatedItems = affectedRange.map((rank, index) => {
                const item = playlistItems.find((item) => item.rank === rank);
                if (item) {
                  return {
                    ...item,
                    rank: isDown ? rank - 1 : rank + 1,
                  };
                }
                return null;
            });

            const movedItem = playlistItems.find((item) => item.rank === Number(active.id));
            if (movedItem) {
                updatedItems.push({
                    ...movedItem,
                    rank: Number(over.id)
                });
            }
        
            const filteredUpdatedItems = updatedItems.filter((item) => item !== null);

            const { data, error } = await supabase
                .from('playlist_item')
                .upsert(filteredUpdatedItems);

        } catch (error) {
            console.log(error)
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            }
        })
    )

    return (
        <div className='@container p-4'>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Film</TableHead>
                    <TableHead><span className='hidden text-right @xl:block @xl:text-left'>Commentaire</span></TableHead>
                    <TableHead className="text-right"><span className="sr-only">Edit</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                        <SortableContext items={playlistItems.map((item) => ({ id: item.rank }))} strategy={verticalListSortingStrategy}>
                            {playlistItems.map((item, index) => (
                                <SortablePlaylistItem index={index} key={item.id} item={item}/>
                            ))}
                        </SortableContext>
                    </DndContext>
                </TableBody>
            </Table>
        </div>
    )
}

const SortablePlaylistItem = ({
    item,
    index,
} : {
    item:PlaylistItem,
    index: number,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: item.rank as UniqueIdentifier});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='group'
        >
            <TableCell className="text-muted-foreground font-medium">{item.rank}</TableCell>
            <TableCell><MovieCard link={false} filmId={item.film_id} displayMode='row' /></TableCell>
            <TableCell className=''><PlaylistEditComment playlistItem={item} /></TableCell>
            <TableCell className="text-right">
                <Button data-no-dnd="true" size={'sm'} variant={'ghost'}>
                    <XCircle  className=' fill-white text-background'/>
                </Button>
            </TableCell>
        </TableRow>
    )
}
