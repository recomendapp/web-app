"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { databases, storage } from "@/utils/appwrite";
import Compressor from "compressorjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PictureUpload({ user, userRefresh } : { user: any, userRefresh: () => void }) {
    const [isUploading, setIsUploading] = useState(false)

    const [ compressedImage, setCompressedImage ] = useState<File | Blob>()

    const userInitiales = (() => {
        if (user) {
            const words = user?.username.normalize('NFKC').toUpperCase().split(' ');
            let initials = '';
            if (words.length === 1) {
                initials = words[0].charAt(0);
            } else if (words.length >= 2) {
                for (let i = 0; i < 2; i++) {
                    initials += words[i].charAt(0);
                }
            }
            return initials;
        } else {
            return null
        }
    })();

    const updateUserProfilePicture = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0];
        if (file) {
            setIsUploading(true)
            const uploadPromise = new Promise<void>((resolve, reject) => {
                handleUpdateUserProfilePicture(user.$id, user.avatar, file)
                  .then(async (response: any) => {
                    setIsUploading(false);
                    resolve(); // Résoudre la promesse lorsque l'upload est terminé
                  })
                  .catch((error) => {
                    setIsUploading(false);
                    reject(); // Rejeter la promesse en cas d'erreur
                  });
              });
          
              toast.promise(
                uploadPromise,
                {
                  pending: 'Upload en cours...',
                  success: 'Upload terminé avec succès 👌',
                  error: 'Erreur lors de l\'upload 🤯'
                }
              );
            
        }
    };

    async function handleUpdateUserProfilePicture(userId: string, oldPathToProfilePicture: string, file: File) {
        try {
            new Compressor(file, {      
                quality: 1,
                resize: "cover",
                convertTypes: ['image/png', 'image/webp'],
                convertSize: 10000,
                width: 150,
                height: 150,
                success: async (compressedImage) => {
                    // RENAME IMAGE
                    const image = new File([compressedImage], String(userId + compressedImage.name.substring(file.name.lastIndexOf('.'), compressedImage.name.length)), {type: compressedImage.type})
                    // PLOAD THE PROFILE PICTURE
                    const { $id } = await storage.createFile(
                        String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_USERS_AVATAR), 
                        'unique()', 
                        image
                    )
                    // UPDATE PATH TO PROFILE PICTURE
                    await databases.updateDocument(
                        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER), 
                        userId, 
                        {
                            "avatar": `${process.env.NEXT_PUBLIC_APPWRITE_END_POINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_USERS_AVATAR}/files/${$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
                        }
                    )
                    // DELETE OLD PROFILE PICTURE
                    if(oldPathToProfilePicture) {
                        await storage.deleteFile(
                            String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_USERS_AVATAR), 
                            oldPathToProfilePicture.split('/').reverse()[1]
                        );
                    }
                    userRefresh()
                    return
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <label className='flex w-[150px] h-[150px] rounded-full overflow-hidden relative cursor-pointer'>
                <Avatar className="w-full h-full">
                    {isUploading && (
                        <div className='absolute w-full h-full flex items-center justify-center bg-black/80'>
                            <div className=' object-cover'>
                                <Loader2 className="animate-spin"/>
                            </div>
                        </div>  
                    )}
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className='text-[75px]'>{userInitiales}</AvatarFallback>
                </Avatar>
                <input type={!isUploading ? 'file' : 'text'} accept=".jpg,.png,.jpeg,.webp" max="2097152" onChange={updateUserProfilePicture} className='hidden' />
            </label>
    )
}