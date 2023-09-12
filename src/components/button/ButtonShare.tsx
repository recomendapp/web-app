// UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CopyToClipboard } from "@/hooks/utils/CopyToClipboard"

// ICONS
import { ClipboardCheck, Copy, Share } from "lucide-react"
import { useState } from "react"

export default function ButtonShare({ url, icon } : { url: string, icon?: boolean }) {

    if (icon)
    {
      return (
        <Button variant={'share'} onClick={() => CopyToClipboard(url)}>
            <Share className="h-4 w-4" />
        </Button>
      )
    }

    return (
      <p onClick={() => CopyToClipboard(url)} >Partager</p>
    )
}
/*
<Popover>
  <PopoverTrigger asChild>
    <Button variant="share" size={'icon'} >
        <Share size={20} />
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="flex flex-col space-y-2 text-center sm:text-left">
      <h3 className="text-lg font-semibold">Partager la critique</h3>
    </div>
    <div className="flex items-center space-x-2 pt-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="sr-only">
          Link
        </Label>
        <Input
          id="link"
          defaultValue={url}
          readOnly
          className="h-9"
        />
      </div>
      <Button type="submit" size="sm" className="px-3" onClick={() => CopyToClipboard(url)}>
        <span className="sr-only">Copier</span>
        {icon ? 
            <ClipboardCheck className="h-4 w-4" />
            :
            <Copy className="h-4 w-4" />
        }
      </Button>
    </div>
  </PopoverContent>
</Popover>*/