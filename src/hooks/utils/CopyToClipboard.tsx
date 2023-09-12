import { toast } from "react-toastify";

export function CopyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    toast.success(`Lien copié dans le presse-papiers`);
}