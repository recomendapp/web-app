"use client"

import Tiptap from "@/components/Editor/Editor";
import { User } from "@/types/type.user";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MovieAction } from "@/components/Film/FilmAction/MovieAction";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "react-query";
import { supabase } from "@/lib/supabase/supabase";

export default function CreateReviewForm({ filmId, user } : { filmId: number, user: User }) {
  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError
  } = useQuery({
    queryKey: ['user', user?.id, 'film', filmId, 'activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_movie_activity')
        .select(`*, review(count)`)
        .eq('film_id', filmId)
        .eq('user_id', user?.id)
        .single()
      return (data)
    },
    enabled: user?.id !== undefined && user?.id !== null,
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
            .from('review')
            .insert({
              id: activity?.id,
              film_id: filmId,
              user_id: user.id,
              title: title ? title.trim() : `Critique par ${user.username}`,
              body: JSON.stringify(body),
            })
          if (error) throw error;
          toast.success('Votre critique a été publié avec succès');
          router.push(`/@${user.username}/film/${filmId}`);
        } catch (error) {
          toast.error("Une erreur s'est produite");
        } finally {
          setLoading(false)
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
              <MovieAction filmId={filmId} rating like/>
            </div>
            {/* BODY */}
            <Tiptap setBody={setBody}/>
            {/* SUBMIT */}
            <Button disabled={loading} onClick={createReview}>
                {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enregistrer
            </Button>
          </div>
      </>
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