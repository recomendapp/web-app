"use client"

import { JSONContent, generateHTML } from "@tiptap/react";
import { EDITOR_EXTENSIONS } from "../../Editor/EditorExtensions";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import Tiptap from "../../Editor/Editor";
import { MovieReviewSettings } from "../MovieReviewSettings";
import { Models } from "appwrite";
import UserCard from "@/components/elements/UserCard/UserCard";
import { FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Icons } from "@/components/icons";
import { useQueryClient } from "react-query";

interface MovieReviewFormProps {
  review: Models.Document;
}

export default function MovieReviewForm({ review } : MovieReviewFormProps) {

  const { user } = useUser();
  const queryClient = useQueryClient();
  const [ title, setTitle ] = useState(review.title);
  const [ body, setBody ] = useState<JSONContent>(JSON.parse(review.body));
  const [ isLoading, setIsLoading ] = useState(false);

  const [ editable, setEditable ] = useState(false);

  const updateReview = async () => {
    
    if (title == review.title && JSON.stringify(body) == review.body) {
      setEditable(false);
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
      setIsLoading(true);
      await handleUpdateReview(review.$id, title.trim(), JSON.stringify(body));
      toast.success("Les modifications ont bien été enregistrées");
      setEditable(false);
    } catch (error) {
      toast.error("Une erreur s'est produite")
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-col justify-center items-center bg-background">
        {/* SETTINGS */}
        <div className='flex justify-end w-full gap-2'>
            {review.user.$id == user?.$id && 
              <Button variant={'ghost'} size={'sm'} onClick={() => setEditable(true)}>
                <span className="sr-only">Modifier</span>
                <FileEdit />
              </Button>
            }
            <MovieReviewSettings review={review} />
        </div>
        <div className="w-full flex flex-col gap-4 justify-center items-center px-4 py-5">
            <ReviewTitle title={title} setTitle={setTitle} editable={editable}/>
            <UserCard user={review.user} />
        </div>
        
      </div>
        
      {/* REVIEW */}
      <div className='flex flex-col gap-4 overflow-hidden'>
        <Tiptap setBody={setBody} defaultValue={body} editable={editable}/>
      </div>
      {editable && 
        <Button disabled={isLoading} onClick={updateReview}>
          {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Enregistrer
        </Button>
      }
    </div>
  )
}

export function ReviewTitle({ title, setTitle, editable } : { title: string, setTitle: Dispatch<SetStateAction<string>>, editable: boolean }) {
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
        readOnly={!editable}
        placeholder="Titre"
        maxLength={50}
        className="w-full h-fit border-none outline-none focus-visible:ring-0 overflow-hidden resize-none text-5xl font-semibold text-center text-accent-1"
      />
  )
}