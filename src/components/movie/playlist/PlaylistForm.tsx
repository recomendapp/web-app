"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  DialogFooter,
} from "@/components/ui/dialog"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { toast } from "react-toastify"
import { Textarea } from "@/components/ui/textarea"
import { databases } from "@/utils/appwrite"
import { Dispatch } from "react"


// This can come from your database or API.
interface PlaylistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  success: () => void,
  userId: string,
  movieId?: number,
  playlist?: any,
  setPlaylist?: Dispatch<any>,
}


export function PlaylistForm({ success, userId, movieId, playlist, setPlaylist } : PlaylistFormProps) {
  
  const CreatePlaylistFormSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Le nom est obligatoire",
      })
      .max(100, {
        message: "Le nom ne doit pas dépasser 100 caractères.",
      })
      .regex(/^[a-zA-Z0-9\s\S]*$/),
    description: z
      .string()
      .max(300, {
        message: "La description ne doit pas dépasser 300 caractères."
      })
      .optional(),
    is_public: z
      .boolean()
      .default(true),
  })

  type CreatePlaylistFormValues = z.infer<typeof CreatePlaylistFormSchema>

  const defaultValues: Partial<CreatePlaylistFormValues> = {
    name: playlist ? playlist.title : "",
    description: playlist ? playlist.description : "",
    is_public: playlist ? playlist.is_public : true,
  }

  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(CreatePlaylistFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function createPlaylist(data: CreatePlaylistFormValues) {
    try {
      const { $id } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        'unique()',
        {
          "title" : data.name,
          "description" : data.description,
          "userId": userId,
          "is_public": data.is_public,
        }
      )
      if (movieId) {
        await databases.createDocument(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM), 
          'unique()', {
              "movieId" : movieId,
              "playlistId" : $id,
              "playlist": $id,
              "user": userId,
          }
        )
      }

      toast.success("La playlist a été créé avec succès 👌")
      success()
      return

    } catch (error: any) {
      toast.error("Une erreur s\'est produite 🤯");
    }
  }

  async function updatePlaylist(data: CreatePlaylistFormValues) {
    try {
      const newPlaylist = await databases.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        playlist.$id,
        {
          "title" : data.name,
          "description" : data.description,
          "is_public": data.is_public,
        }
      )
      setPlaylist && setPlaylist(newPlaylist)
      toast.success("Les informations ont bien été enregistrée 👌")
      success()
      return

    } catch (error: any) {
      toast.error("Une erreur s\'est produite 🤯");
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(playlist ? updatePlaylist : createPlaylist)} className="space-y-8">
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    id="name" 
                    placeholder="Ajoutez un nom"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    id="name" 
                    placeholder="Ajoutez une description facultative"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibilité</FormLabel>
                <FormControl className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="airplane-mode">{field.value ? "Public" : "Privée"}</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
        </div>
        <DialogFooter>
            <Button type="submit">{playlist ? "Sauvegarder" : "Créer"}</Button>
        </DialogFooter>
      </form>
    </Form>
    
  )
}