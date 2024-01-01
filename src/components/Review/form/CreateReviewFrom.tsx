"use client"

import Tiptap from "@/components/Editor/Editor";
import { User } from "@/types/type.user";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MovieAction } from "@/components/Film/FilmAction/MovieAction";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "react-query";
import { supabase } from "@/lib/supabase/client";
import MovieCard, { MovieCardRow } from "@/components/Film/Card/MovieCard";

export default function CreateReviewForm({
  film,
  user
} : {
  film: any,
  user: User
}) {
  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError
  } = useQuery({
    queryKey: ['user', user?.id, 'film', film.id, 'activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_movie_activity')
        .select(`*, review:user_movie_review(count)`)
        .eq('film_id', film.id)
        .eq('user_id', user?.id)
        .single()
      return (data)
    },
    enabled: !!user?.id,
  });
  const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const [ body, setBody ] = useState<JSONContent>();
    const [ title, setTitle ] = useState<string>("");

    async function createReview() {
        if (!activity?.rating)
        {
            toast.error("Vous devez noter ce film pour ajouter une critique");
            return
        }

        if (!title || !/[a-zA-Z0-9]/.test(title))
        {
          toast.error("Le titre est obligatoire");
          return
        }

        if (!body || (body?.content?.length == 1 && !body.content[0].content?.length))
        {
          toast.error("La critique est obligatoire");
          return
        }
    
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('user_movie_review')
            .insert({
              id: activity?.id,
              film_id: film.id,
              user_id: user.id,
              title: title.trim(),
              body: JSON.stringify(body),
            })
          if (error) throw error;
          toast.success('Votre critique a été publié avec succès');
          router.push(`/@${user.username}/film/${film.id}`);
        } catch (error) {
          toast.error("Une erreur s'est produite");
        } finally {
          setLoading(false)
        }
      }

    return (
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="bg-muted h-fit p-4 rounded-md">
          <MovieCard filmId={film.id} />
        </div>
        <div className="w-full bg-muted p-4 rounded-md">
            <h2 className="text-3xl font-bold text-center p-4">Nouvelle critique</h2>
            <div className="flex flex-col gap-2">
              {/* REACTION */}
              <div className="flex gap-4 justify-between items-center">
                {/* TITLE */}
                <ReviewTitle title={title} setTitle={setTitle}/>
                <MovieAction filmId={film.id} rating like/>
              </div>
              {/* BODY */}
              <Tiptap setBody={setBody} placeholder="Écrire une critique..."/>
              {/* SUBMIT */}
              <Button disabled={loading} onClick={createReview}>
                  {loading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Enregistrer
              </Button>
            </div>
        </div>
      </div>
    )
}

export function ReviewTitle({
  title, setTitle}
: {
  title: string,
  setTitle: Dispatch<SetStateAction<string>> 
}) {
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