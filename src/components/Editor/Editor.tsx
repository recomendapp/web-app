'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

// TIPTAP
import {
  useEditor,
  EditorContent,
  JSONContent,
  Editor
} from '@tiptap/react'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'

// CUSTOM CSS
import './Editor.css'

// ICONS
import * as Icons from 'lucide-react'

// UI
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { EDITOR_EXTENSIONS } from './EditorExtensions';

interface TiptapProps {
  setBody: Dispatch<SetStateAction<JSONContent>>,
  editable?: boolean,
  defaultValue?: JSONContent,
  placeholder?: string,
}

const Tiptap = ({
  setBody,
  editable = true,
  defaultValue,
  placeholder,
} : TiptapProps ) => {
  const limit = 5000;
  const editor = useEditor({
    editable: editable,
    extensions: [
      ...EDITOR_EXTENSIONS,
      // Code,
      CharacterCount.configure({
        limit,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: defaultValue,
    onUpdate({ editor }) {
      setBody(editor.getJSON());
    }
  }, [editable])

  return (
    <div 
      className={` rounded-md
         ${editable && 'border border-foreground/60'}
      `}
    >
      {editable && <Toolbar editor={editor} />}

      <EditorContent editor={editor} className=' p-4'/>
      {editable && <p className='text-right px-4 pb-4 text-muted-foreground'>{editor?.storage.characterCount.characters()}/{limit} caractères</p>}
    </div>

  )
}

export default Tiptap

export function Toolbar({ editor } : { editor: Editor | null}) {
  return (
    <div className="flex gap-2 border-b border-foreground/60 p-2">
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
        >
          <Icons.Undo />
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
        >
          <Icons.Redo />
        </Button>
        <LinkAction editor={editor} />
        <Button
          variant={editor?.isActive("bold") ? 'secondary' : 'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Icons.Bold />
        </Button>
        <Button
          variant={editor?.isActive("underline") ? 'secondary' : 'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <Icons.Underline />
        </Button>
        <Button
          variant={editor?.isActive("italic") ? 'secondary' : 'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Icons.Italic />
        </Button>
        <Button
          variant={editor?.isActive("strike") ? 'secondary' : 'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <Icons.Strikethrough />
        </Button>
        {/* <Button
          variant={editor?.isActive("code") ? 'secondary' : 'ghost'}
          size={'icon'}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          <Icons.Code />
        </Button> */}
      </div>
  )
}

export function LinkAction({ editor } : { editor: Editor | null}) {

  const [ open, setOpen ] = useState(false);

  const saveLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    if (formData.get("link"))
    {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: String(formData.get("link")), target: "_blank" })
        .run();
    }
    else
    {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={editor?.isActive("link") ? 'secondary' : 'ghost'}>
          <Icons.Link />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center">
          <form onSubmit={saveLink} className="flex items-center gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="link" className="sr-only">
                Lien
              </Label>
              <Input
                name="link"
                defaultValue={editor?.getAttributes("link").href}
                placeholder='https://...'
                className="max-w-[200px]"
              />
            </div>
            <Button type="submit" size="sm">
              <span className="sr-only">Save</span>
              <Icons.Save className="h-4 w-4" />
            </Button>
          </form>
      </PopoverContent>
    </Popover>
  )
}