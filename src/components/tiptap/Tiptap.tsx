'use client';

import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';

// TIPTAP
import { useEditor, EditorContent, JSONContent, Editor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';

// CUSTOM CSS
import './Tiptap.css';

// ICONS
import * as Icons from 'lucide-react';

// UI
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { EDITOR_EXTENSIONS } from './TiptapExtensions';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

interface TiptapProps {
  onUpdate?: (data: JSONContent) => void;
  onCharacterCountChange?: (count: number) => void;
  editable?: boolean;
  content?: JSONContent;
  limit?: number;
  placeholder?: string;
}

const Tiptap = ({
  onUpdate,
  onCharacterCountChange,
  editable = true,
  content,
  limit = 5000,
  placeholder,
}: TiptapProps) => {
  const [initBodyLength, setInitBodyLength] = useState(false);
  const editor = useEditor(
    {
      editable: editable,
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none',
        },
      },
      extensions: [
        ...EDITOR_EXTENSIONS,
        // Code,
        CharacterCount.configure({
          limit: limit,
        }),
        Placeholder.configure({
          placeholder: placeholder,
        }),
      ],
      content: content,
      onUpdate({ editor }) {
        onUpdate && onUpdate(editor.getJSON());
        onCharacterCountChange && onCharacterCountChange(editor.storage.characterCount.characters());
      },
    },
    [editable]
  );

  useEffect(() => {
    if (!initBodyLength && editor && onCharacterCountChange) {
      onCharacterCountChange(editor.storage.characterCount.characters());
      setInitBodyLength(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, onCharacterCountChange]);

  return (
    <div
      className={`
        rounded-md
        ${editable ? 'bg-background border border-muted-foreground' : ''}
      `}
    >
      {editable && <Toolbar editor={editor} />}
        <div className={editable ? 'p-4' : ''}>
          <EditorContent editor={editor} />
          {editable && (
            <p className="text-xs text-right text-muted-foreground">
              {editor?.storage.characterCount.characters()} / {limit}
            </p>
          )}
        </div>
    </div>
  );
};

export default Tiptap;

export function Toolbar({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex gap-2 border-b border-muted-foreground p-1">
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().undo()}
      >
        <Icons.Undo size={15} />
      </Button>
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().redo()}
      >
        <Icons.Redo size={15} />
      </Button>
      <LinkAction editor={editor} />
      <Button
        variant={editor?.isActive('bold') ? 'accent-yellow-enabled' : 'ghost'}
        size={'icon'}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Icons.Bold size={15} />
      </Button>
      <Button
        variant={editor?.isActive('underline') ? 'accent-yellow-enabled' : 'ghost'}
        size={'icon'}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <Icons.Underline size={15} />
      </Button>
      <Button
        variant={editor?.isActive('italic') ? 'accent-yellow-enabled' : 'ghost'}
        size={'icon'}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Icons.Italic size={15} />
      </Button>
      <Button
        variant={editor?.isActive('strike') ? 'accent-yellow-enabled' : 'ghost'}
        size={'icon'}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Icons.Strikethrough size={15} />
      </Button>
      {/* <Button
          variant={editor?.isActive("code") ? 'accent-yellow-enabled' : 'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          <Icons.Code />
        </Button> */}
    </div>
  );
}

function LinkAction({ editor }: { editor: Editor | null }) {
  const t = useTranslations('common')
  const [open, setOpen] = useState(false);

  const saveLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('link')) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: String(formData.get('link')), target: '_blank' })
        .run();
    } else {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={editor?.isActive('link') ? 'accent-yellow-enabled' : 'ghost'}>
          <Icons.Link size={15} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center">
        <form onSubmit={saveLink} className="flex items-center gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="link" className="sr-only">
            {upperFirst(t('messages.link'))}
            </Label>
            <Input
              name="link"
              defaultValue={editor?.getAttributes('link').href}
              placeholder="https://..."
              className="max-w-[200px]"
            />
          </div>
          <Button type="submit" size="sm">
            <span className="sr-only">{upperFirst(t('word.save'))}</span>
            <Icons.Save className="h-4 w-4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
