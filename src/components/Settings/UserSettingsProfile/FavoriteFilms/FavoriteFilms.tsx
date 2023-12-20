"use client";

import MovieCard from "@/components/Film/Card/MovieCard";
import { MouseSensor, TouchSensor } from "@/components/Playlist/FilmPlaylist/PlaylistEdit/components/CustomSensor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DndContext, DragEndEvent, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import SearchFavoriteFilms from "./components/SearchFavoriteFilms";
import { toast } from "react-hot-toast";

export function FavoriteFilms({
    onChange,
    onBlur,
    disabled,
    value,
    name,
    ref,
} : ControllerRenderProps) {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            }
        })
    )

    const onDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
    
        if(active.id === over?.id || !active || !over)
            return
    
        onChange(arrayMove(value, Number(active.id) - 1, Number(over.id) - 1));
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-2">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={value.map((filmId: number, index: number) => ({ id: index + 1 }))} strategy={horizontalListSortingStrategy}>
                        {value.map((filmId: number, index: number) => (
                            <SortableFilm
                                index={index + 1}
                                key={index + 1}
                                filmId={filmId}
                                onDelete={(id: number) => {
                                    onChange(value.filter((id: number) => id !== filmId))
                                }}
                            />
                        ))}
                        {value.length < 4 && (
                            <Button
                                variant={"muted"}
                                className="h-full"
                                onClick={() => setModalIsOpen(true)}
                            >
                                <Plus />
                            </Button>
                        )}
                    </SortableContext>
                </DndContext>
            </div>
            <ModalFavoriteFilms
                open={modalIsOpen}
                setOpen={setModalIsOpen}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

const SortableFilm = ({
    filmId,
    index,
    onDelete
} : {
    filmId: number,
    index: number,
    onDelete: (id: number) => void,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: index as UniqueIdentifier});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='relative'
        >
            <Button
                variant={"muted"}
                size={"icon"}
                className="absolute top-2 right-2 z-[1] rounded-full p-0"
                onClick={() => onDelete(filmId)}
                data-no-dnd="true"
            >
                <X size={15} />
            </Button>
            <MovieCard
                key={filmId}
                filmId={filmId}
                displayMode={"grid"}
            />
        </div>
    )
}

const ModalFavoriteFilms = ({
    open,
    setOpen,
    value,
    onChange,
} : {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    value: number[],
    onChange: (value: number[]) => void,
}) => {
    const onAdd = (filmId: number) => {
        if (value.includes(filmId)) {
            toast.error('Ce film est déjà dans vos films favoris');
        } else {
            onChange([...value, filmId]);
            setOpen(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl h-2/3">
                <DialogHeader>
                    <DialogTitle>
                        Ajouter un film favori
                    </DialogTitle>
                </DialogHeader>
                <SearchFavoriteFilms
                    onClick={(filmId: number) => onAdd(filmId)}
                />
            </DialogContent>
        </Dialog>
    )
}