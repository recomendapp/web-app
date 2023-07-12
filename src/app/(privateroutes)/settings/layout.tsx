import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { SettingsNav } from "@/app/(privateroutes)/settings/settingsNav"

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
}

const settingsNavItems = [
  {
    title: "Profil",
    href: "/settings/profile",
  },
  {
    title: "Compte",
    href: "/settings/account",
  },
  {
    title: "Sécurité",
    href: "/settings/security",
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16 ">
      <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
          Gérez les paramètres de votre compte.
          </p>
      </div>
      {/* <Separator className="my-6" /> */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
          <SettingsNav items={settingsNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}