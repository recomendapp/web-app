"use client"

import Tiptap from "@/components/modules/Editor/Editor";
import { isLiked, isRated } from "@/types/movie/type.movie_action";
import { User } from "@/types/type.user";
import { databases } from "@/lib/appwrite";
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
import { MovieAction } from "@/components/modules/MovieAction/MovieAction";
import { Divide } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { FilmAction } from "@/types/type.film";
import FILM_ACTION_QUERY from "@/components/modules/MovieAction/queries/filmActionQuery";
import INSERT_REVIEW_MUTATION from "@/components/modules/Review/mutations/insertReviewMutation";

export default function CreateReviewForm({ filmId, user } : { filmId: string, user: User }) {

  const { data: filmActionQuery, loading: filmActionLoading, error } = useQuery(FILM_ACTION_QUERY, {
    variables: {
      film_id: filmId,
      user_id: user?.id,
    },
    skip: !user
  })
  const filmAction: FilmAction = filmActionQuery?.film_actionCollection?.edges[0]?.action;

  const [ insertReviewMutation, { error: errorAddingReview } ] = useMutation(INSERT_REVIEW_MUTATION, {
    // update: (store, { data }) => {
    // },
  });
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const [ body, setBody ] = useState<JSONContent>();
    const [ title, setTitle ] = useState<string>("");

    async function createReview() {
    
        if (!filmAction.rating)
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
          await insertReviewMutation({
            variables: {
              film_id: filmId,
              user_id: user.id,
              title: title ? title.trim() : `Critique par ${user.username}`,
              body: JSON.stringify(body),
              action_id: filmAction.id,
            }
          })
          toast.success(
            'Votre critique a été publié avec succès'
          );
          router.push(`/movie/${filmId}/review/${user.username}`);
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