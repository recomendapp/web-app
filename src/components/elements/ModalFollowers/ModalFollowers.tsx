"use client"

import { SettingsNav } from "@/components/elements/SettingsNav/SettingsNav"
// UI
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@/context/UserProvider"
import { Settings } from "lucide-react"

export default function ModalFollowers({ userId } : { userId: string }) {
    const { user } = useUser();

    if (!user || user.$id != userId)
        return null

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="action">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Paramètres</DialogTitle>
                </DialogHeader>
                <SettingsNav className="items-center" />
            </DialogContent>
        </Dialog>
    )
}