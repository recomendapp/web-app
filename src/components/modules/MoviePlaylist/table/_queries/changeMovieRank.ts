import { databases } from "@/db/appwrite";
import { arrayMove } from "@dnd-kit/sortable";
import { Models } from "appwrite";

interface DataExtended extends Models.Document {
    id: number,
}

export const changeMovieRank = async (data: DataExtended[], fromIndex: number, toIndex: number) => {
    try {
        const isDown = fromIndex < toIndex;
        const fromItem = data[fromIndex]
        const toItem = data[toIndex]

        // SWAP CASE
        if (fromIndex + 1 == toIndex || fromIndex - 1 == toIndex)
        {
            await databases.updateDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
                fromItem.$id,
                {
                    rank: toItem.rank
                }
            )
            await databases.updateDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
                toItem.$id,
                {
                    rank: fromItem.rank
                }
            )
            let newData = data.map(( item, index ) => {
                if (index == fromIndex) {
                    return { ...item, rank: toItem.rank};
                }
                if (index == toIndex) {
                    return { ...item, rank: fromItem.rank};
                }
                return item;
            })
            newData = arrayMove(
                newData,
                fromIndex,
                toIndex
            )
            return (newData);
        }
        else {
            let prevRank = isDown ? toItem.rank : (toIndex && data[toIndex - 1].rank);
            let nextRank = isDown ? (toIndex != (data.length - 1) && data[toIndex + 1].rank) : toItem.rank;
            if (nextRank - prevRank == 1)
                return (await resetRank(data, fromIndex, toIndex))
            let newRank: number;
            if (toIndex === 0) // CASE FIRST ITEM
                newRank = Math.ceil(nextRank / 2); 
            else if (toIndex == data.length - 1) // CASE LAST ITEM
                newRank = (Math.ceil(prevRank / 100) * 100) + 100;
            else // OTHERS CASES
                newRank = Math.ceil((prevRank + nextRank) / 2);

            await databases.updateDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
                fromItem.$id,
                {
                    rank: newRank
                }
            )
            let newData = data.map(( item, index ) => {
                if (index == fromIndex) {
                    return { ...item, rank: newRank};
                }
                return item;
            })
            newData = arrayMove(
                newData,
                fromIndex,
                toIndex
            )
            return (newData);
        }
    } catch (error) {
        console.error(error);
    }

}

const resetRank = async (data: DataExtended[], fromIndex: number, toIndex: number) => {
    let newData = arrayMove(
        data,
        fromIndex,
        toIndex
    )
    const newRankedData = await Promise.all(newData.map(async (item, index) => {
        await databases.updateDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
            item.$id,
            {
                rank: ((index + 1) * 100)
            }
        );
        return { ...item, rank: ((index + 1) * 100) };
    }));
    return newRankedData
}