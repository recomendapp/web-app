// UI
import { Button } from "@/components/ui/button"
import { CopyToClipboard } from "@/utils/CopyToClipboard"

// ICONS
import { Share } from "lucide-react"

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