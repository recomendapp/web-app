"use client"

import { useState } from 'react'
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
import { Icons } from '@/components/icons'


// This can come from your database or API.


export function SignupForm() {

  const router = useRouter();

  const { signup } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signupFormSchema = z.object({
    email: z
    .string()
    .email({
      message: "Adresse email invalide.",
    }),
    name: z
    .string()
    .min(1, {
      message: "Le nom doit comporter au moins 1 caractère.",
    })
    .max(50, {
      message: "Le nom ne doit pas dépasser 50 caractères.",
    })
    .regex(/^[a-zA-Z0-9\s\S]*$/),
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
        const isUsernameExist = await checkUsernameExist(value);
        return !isUsernameExist; 
      }, {
        message: "Cet username n'est pas disponible."
      }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir moins 8 caractères.",
      })
      .max(50, {
        message: "Le mot de passe ne doit pas dépasser 128 caractères.",
      })
      .refine((value) => /^[a-zA-Z0-9!@#$%^&*_\-]*$/.test(value), {
        message: "Le mot de passe peut inclure des caractères alphabétiques, numériques et spéciaux.",
      }),
    confirmpassword: z
      .string()
      .min(8, {
        message: "Les mots de passe ne correspondent pas.",
      })
      .max(50, {
        message: "Les mots de passe ne correspondent pas.",
      })
      .refine((value) => /^[a-zA-Z0-9!@#$%^&*_\-]*$/.test(value), {
        message: "Les mots de passe ne correspondent pas.",
      }),

  })

  type SignupFormValues = z.infer<typeof signupFormSchema>

  const defaultValues: Partial<SignupFormValues> = {
    email: "",
    name: "",
    username: "",
    password: "",
    confirmpassword: ""
    // urls: [
    //   { value: "https://shadcn.com" },
    //   { value: "http://twitter.com/shadcn" },
    // ],
  }

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: SignupFormValues) {

    setIsLoading(true)

    if( data.password !== data.confirmpassword ) {
      form.setError("password", {
        message: "",
      });
      form.setError("confirmpassword", {
        message: "Les mots de passe ne correspondent pas.",
      });
      setIsLoading(false);
      return
    }


    try {
      const isUsernameExist = await checkUsernameExist(data.username);
      if (!isUsernameExist) {
        try {
          await signup(data.email, data.name, data.username, data.password);
          setIsLoading(false);
          toast.success('Un email de confirmation vient de vous être envoyé 🤯');
        } catch (error) {
          setIsLoading(false);
          form.setError("email", {
            message: "L\'adresse email est déjà associée à un compte."
          });
        }
      } else {
        setIsLoading(false);
        form.setError("username", {
          message: "Cet username n'est pas disponible."
        })
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Une erreur s\'est produite 🤯');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input 
                  autoComplete="email"
                  disabled={isLoading} 
                  placeholder="jeanluc.godard@gmail.com" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="flex flex-col md:flex-row w-full justify-between gap-4">
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input 
                  autoComplete="given-name"
                  disabled={isLoading} 
                  placeholder="Jean-Luc Godard" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input 
                  autoComplete="username"
                  disabled={isLoading} 
                  placeholder="@jlgodard" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input 
                  disabled={isLoading}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mot de passe"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input 
                  disabled={isLoading}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirmer le mot de passe"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
        <Button className='w-full' type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
              S&apos;inscrire
        </Button>
        </div>
      </form>
    </Form>
  )
}