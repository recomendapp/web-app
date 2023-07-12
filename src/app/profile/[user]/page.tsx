
import { checkUsernameExist, getUserDetails } from '@/utils/appwrite'
import { PlusCircle } from 'lucide-react'
import ProfilePage from './ProfilePage'

// import { useState, useEffect } from 'react'


export async function generateMetadata({ params }: { params: { user: string } }) {
    const user = await getUserDetails(params.user)
    if(!user) {
        return {
            title: "Oups, utilisateur introuvable !"
        }
    }
    return {
        title: `@${user.username}`,
        description: `This is the page of @${user.username}`
    }
    
}


export default async function User({ params }: { params: { user: string } }) {
    const user = await getUserDetails(params.user)
    if(!user) throw "User not found"

    console.log('user', user.username)

    return (
        <div className='bg-red-500 p-4'>
            <ProfilePage userPage={user} />
        </div>
    )



    // return (
    //     <>
    //         {userAvailability !== null ? (
    //             <>
    //                 {userAvailability ? (
    //                     <div className='container h-full relative flex flex-col items-center justify-center'>Username : {params.user}</div>
    //                 ) : (
    //                     <div className='container h-full relative flex flex-col items-center justify-center'>L&apos;utilisateur n&apos;existe pas</div>
    //                 )}

    //             </>
    //         )   : (
    //             <Loader/>
    //         )}
    //     </>
    // )
}