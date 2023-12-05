// UI
import { Button } from "@/components/ui/button"
import copyToClipboard from "@/hooks/copy-to-clipboard"

// ICONS
import { Share } from "lucide-react"

export default function ButtonShare({ url, icon } : { url: string, icon?: boolean }) {

    if (icon)
    {
      return (
        <Button variant={'share'} onClick={() => copyToClipboard(url)}>
            <Share className="h-4 w-4" />
        </Button>
      )
    }

    return (
      <p onClick={() => copyToClipboard(url)} >Partager</p>
    )
}