import { arrayMove } from "@dnd-kit/sortable";
import { Models } from "appwrite";

interface DataExtended extends Models.Document {
    id: number,
}

export const changeMovieRank = async (data: DataExtended[], fromIndex: number, toIndex: number) => {
    return null
}

const resetRank = async (data: DataExtended[], fromIndex: number, toIndex: number) => {
    return null
}