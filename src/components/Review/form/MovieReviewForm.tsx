'use client';

import { JSONContent } from '@tiptap/react';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Tiptap from '../../Editor/Editor';
import { MovieReviewSettings } from '../MovieReviewSettings';
import UserCard from '@/components/User/UserCard/UserCard';
import { FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { Icons } from '@/components/icons';
import { useAuth } from '@/context/auth-context';

import { UserMovieReviewView } from '@/types/type.db';
import { useMutation } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

interface MovieReviewFormProps {
  review: UserMovieReviewView;
}

export default function MovieReviewForm({ review }: MovieReviewFormProps) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const [title, setTitle] = useState(review?.title);
  const [body, setBody] = useState<JSONContent>(JSON.parse(review?.body ?? ''));
  const [isLoading, setIsLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const { mutateAsync: updateReviewMutation } = useMutation({
    mutationFn: async (payload: { title: string, body: string }) => {
      if (!review?.id) throw new Error('No user id');
      const { data, error } = await supabase
        .from('user_movie_review_view')
        .update(payload as never) // supabase-js types are wrong
        .eq('id', review.id)
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const updateReview = async () => {
    if (title == review?.title && JSON.stringify(body) == review?.body) {
      setEditable(false);
      return;
    }

    if (!title || !/[a-zA-Z0-9]/.test(title)) {
      toast.error('Le titre est obligatoire');
      return;
    }

    if (
      !body ||
      (body?.content?.length == 1 && !body.content[0].content?.length)
    ) {
      toast.error('La critique est obligatoire');
      return;
    }

    try {
      setIsLoading(true);
      await updateReviewMutation({
        title: title.trim(),
        body: JSON.stringify(body),
      });
      toast.success('Enregistré');
      setEditable(false);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-col justify-center items-center">
        {/* SETTINGS */}
        <div className="flex justify-end w-full gap-2">
          {review?.user?.id == user?.id && (
            <Button
              variant={'ghost'}
              size={'sm'}
              onClick={() => (editable ? updateReview() : setEditable(true))}
            >
              <span className="sr-only">Modifier</span>
              <FileEdit />
            </Button>
          )}
          <MovieReviewSettings review={review} />
        </div>
        <div className="w-full flex flex-col gap-4 justify-center items-center px-4 py-5">
          <ReviewTitle title={title} setTitle={setTitle} editable={editable} />
          <UserCard user={review?.user} />
        </div>
      </div>

      {/* REVIEW */}
      <div className="flex flex-col gap-4 overflow-hidden">
        <Tiptap setBody={setBody} defaultValue={body} editable={editable} />
      </div>
      {editable && (
        <Button disabled={isLoading} onClick={updateReview}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer
        </Button>
      )}
    </div>
  );
}

export function ReviewTitle({
  title,
  setTitle,
  editable,
}: {
  title: string | null | undefined;
  setTitle: Dispatch<SetStateAction<string | null | undefined>>;
  editable: boolean;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, title]);

  return (
    <Textarea
      ref={textAreaRef}
      onChange={(e) =>
        setTitle(e.target.value.replace(/\s+/g, ' ').trimStart())
      }
      value={title ?? ''}
      readOnly={!editable}
      placeholder="Titre"
      maxLength={50}
      className="w-full h-fit border-none outline-none focus-visible:ring-0 overflow-hidden resize-none text-5xl font-semibold text-center text-accent-1"
    />
  );
}
