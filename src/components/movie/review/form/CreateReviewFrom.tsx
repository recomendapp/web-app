"use client"

import Tiptap from "@/components/Editor/Editor";
import { isLiked, isRated } from "@/types/movie/type.movie_action";
import { User } from "@/types/type.user";
import { databases } from "@/utils/appwrite";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MovieAction } from "@/components/movie/action/MovieAction/MovieAction";
import { Divide } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function CreateReviewForm({ movieId, user } : { movieId: number, user: User }) {
    
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const [ body, setBody ] = useState<JSONContent>();
    const [ title, setTitle ] = useState<string>("");

    async function createReview() {

        setIsLoading(true);
    
        const isRated = queryClient.getQueryData(['movie', movieId, 'rating']) as isRated;
        const isLiked = queryClient.getQueryData(['movie', movieId, 'like']) as isLiked;
        if (!isRated?.state)
        {
            toast.error("Vous devez noter ce film pour ajouter une critique");
            setIsLoading(false);
            return
        }

        if (!title || !/[a-zA-Z0-9]/.test(title))
        {
          toast.error("Le titre est obligatoire");
          setIsLoading(false);
          return
        }

        if (!body || (body?.content?.length == 1 && !body.content[0].content?.length))
        {
          toast.error("La critique est obligatoire");
          setIsLoading(false);
          return
        }
    
        try {
          const { $id } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
            'unique()',
            {
                movieId: movieId,
                userId: user.$id,
                user: user.$id,
                title: title ? title.trim() : `Critique par ${user.username}`,
                body: JSON.stringify(body),
                movie_liked: isLiked.state,
                movie_rating: isRated.rating
            }
          );
          toast.success(
            'Votre critique a été publié avec succès'
          );
          setIsLoading(false);
          router.push(`/movie/${movieId}/review/${$id}`);
        } catch (error) {
          toast.error("Une erreur s'est produite");
          setIsLoading(false);
        }
      }

    return (
      <>
        <h2 className="text-3xl font-bold text-center p-4">Nouvelle critique</h2>
          <div className="flex flex-col gap-2">
            {/* REACTION */}
            <div className="flex gap-4 justify-between items-center">
              {/* TITLE */}
              <ReviewTitle title={title} setTitle={setTitle}/>
              <MovieAction movieId={movieId} rating like/>
            </div>
            {/* BODY */}
            <Tiptap setBody={setBody}/>
            {/* SUBMIT */}
            <Button disabled={isLoading} onClick={createReview}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enregistrer
            </Button>
          </div>
      </>
    )
}

export function ReviewTitle({ title, setTitle} : { title: string, setTitle: Dispatch<SetStateAction<string>> }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (textAreaRef && textAreaRef.current) {
        textAreaRef.current.style.height = "0px";
        const scrollHeight = textAreaRef.current.scrollHeight;
        textAreaRef.current.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, title]);
  
  return (
      <Textarea
        ref={textAreaRef}
        onChange={(e) => setTitle(e.target.value.replace(/\s+/g, ' ').trimStart())}
        value={title}
        placeholder="Titre"
        maxLength={50}
        className="w-full h-full border-none outline-none focus-visible:ring-0 overflow-hidden resize-none text-5xl font-semibold text-accent-1"
      />
  )
}