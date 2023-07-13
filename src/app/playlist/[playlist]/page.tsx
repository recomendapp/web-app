import { checkUsernameExist, databases, getUserDetails } from '@/utils/appwrite'
import { PlusCircle } from 'lucide-react'
import PlaylistItems from './PlaylistItems'


export async function generateMetadata({ params }: { params: { user: string } }) {
    // const user = await getUserDetails(params.user)
    // if(!user) {
    //     return {
    //         title: "Oups, utilisateur introuvable !"
    //     }
    // }
    // return {
    //     title: `@${user.username}`,
    //     description: `This is the page of @${user.username}`
    // }
    
}

async function getPlaylistDetails(id: string) {
    try {
        return await databases.getDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
            id
        )
    } catch (error) {
        return
    } 
}


export default async function Playlist({ params }: { params: { playlist: string } }) {
    const playlist = await getPlaylistDetails(params.playlist)

    if(!playlist) {
        return (
            <div>
                NOT FOUND
            </div>
        )
    }

    return (
        <div className='bg-red-500 p-4'>
            <div>
                Titre : {playlist.title}
            </div>
            <PlaylistItems playlist={playlist} />
        </div>

    )
}