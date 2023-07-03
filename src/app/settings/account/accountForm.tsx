"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
import { toast } from "react-toastify"
import { useUser } from "@/hooks/user"
import { account, checkUsernameExist, databases } from "@/utils/appwrite"
import { useRouter } from "next/navigation"


// This can come from your database or API.


export function AccountForm() {

  const router = useRouter();
  
  const { user, userRefresh } = useUser();

  const date = new Date();

  const dateLastUsernameUpdate = user.usernameUpdate ? new Date(user.usernameUpdate) : new Date("01/01/1970");
  
  const profileFormSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: "Le nom d'utilisateur doit comporter au moins 3 caractères.",
      })
      .max(15, {
        message: "Le nom d'utilisateur ne doit pas dépasser 15 caractères.",
      })
      .refine((value) => /^[a-zA-Z0-9_]*$/.test(value), {
        message: "L'username ne doit contenir que des lettres, des chiffres et le symbole '_'.",
      })
      .refine(async (value) => {
        if (value === user.username ) {
          return true
        }
        const isUsernameExist = await checkUsernameExist(value);
        return !isUsernameExist; 
      }, {
        message: "Cet username n'est pas disponible."
      }),
    email: z
      .string()
      .email(),
  })

  type ProfileFormValues = z.infer<typeof profileFormSchema>

  const defaultValues: Partial<ProfileFormValues> = {
    username: user.username,
    email: user.email,
    // urls: [
    //   { value: "https://shadcn.com" },
    //   { value: "http://twitter.com/shadcn" },
    // ],
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {


    try {
      await databases.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER), 
        user.$id,
        {
          "username": data.username,
          "usernameUpdate": user.username !== data.username ? date : null
        }
      )
      await userRefresh()
      toast.success('Toutes les modifications ont été enregistrées avec succès 👌')

    } catch (error) {
      await userRefresh()
      toast.error('Une erreur s\'est produite 🤯')
    }
    
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input disabled={!user.emailVerification || (date.getTime() - dateLastUsernameUpdate.getTime()) / (1000 * 60 * 60 * 24) < 30 ? true : false}
              placeholder={user.username} {...field} />
              </FormControl>
              <FormDescription className="text-justify">
                Ceci est votre nom d&apos;utilisateur par lequel les autres personnes peuvent vous trouver et accéder à votre profil. Vous ne pouvez le modifier qu&apos;une fois tous les 30 jours.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Adresse email {!user.emailVerification && (<span className="text-destructive">- non confirmée</span>)}
              </FormLabel>
              <FormControl>
                <Input placeholder={user.email} {...field} disabled />
              </FormControl>
              <FormDescription className="flex flex-col md:flex-row w-full justify-between gap-4">
                <div className="text-justify">
                  Pour modifier votre adresse email contactez nous.
                </div>
                {!user.emailVerification && (
                  <Button 
                    type="button"
                    variant="destructive" 
                    className="h-fit py-1 px-2"
                    onClick={ async () => {
                      try {
                        await account.createVerification(process.env.NEXT_PUBLIC_URL + '/verifyEmail')
                        toast.success("Un email de confirmation a bien été envoyé 👌")
                      } catch {
                        toast.error('Une erreur s\'est produite 🤯')
                      }
                    }}
                  >
                    Confirmer votre adresse email
                  </Button> 
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!user.emailVerification ? true : false} type="submit">Enregistrer</Button>
      </form>
    </Form>
  )
}