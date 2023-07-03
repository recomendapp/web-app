"use client"
import React, {useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/hooks/user"
import { toast } from 'react-toastify';
import { account } from "@/utils/appwrite"


interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setPasswordRecoverySuccess: (success: boolean) => void,
}

export function ForgotPasswordForm({ className, setPasswordRecoverySuccess, ...props }: ForgotPasswordFormProps) {
  const { login } = useUser()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  
  const [ userPasswordRecovery, setUserPasswordRecovery] = useState({
    email: ""
  })

  async function onSubmit(event: React.SyntheticEvent) {

    event.preventDefault()

    setIsLoading(true)

    if(!userPasswordRecovery.email) {
      setIsLoading(false)
      toast.error('Veuillez rentrer votre email 🤯');
      return
  }
    
    try {
      await account.createRecovery(userPasswordRecovery.email, String(process.env.NEXT_PUBLIC_URL+'/resetPassword'))
      setPasswordRecoverySuccess(true)
      setIsLoading(false)
      toast.success('Un e-mail de réinitialisation a bien été envoyé 👌')
    } catch (error) {
      toast.error('Désolé, mais nous ne pouvons pas trouver d\'utilisateur associé à cette adresse e-mail 🤯')
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                setUserPasswordRecovery({
                    ...userPasswordRecovery,
                    email: e.target.value
                })
              }}
              required
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
              Rénitialiser le mot de passe
          </Button>
        </div>
      </form>
    </div>
  )
}