'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserProvider';
import { toast } from 'react-toastify';
import { account } from '@/lib/appwrite';

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const { login } = useUser();

  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [isLoading, setIsLoading] = React.useState<boolean | undefined>(
    undefined
  );

  const [password, setPassword] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setIsLoading(true);

    if (!password.newPassword || !password.confirmNewPassword) {
      setIsLoading(false);
      toast.error('Tous les champs sont requis 🤯');
      return;
    }

    if (password.newPassword !== password.confirmNewPassword) {
      setIsLoading(false);
      toast.error('Les mots de passe ne correspondent pas 🤯');
      return;
    }

    try {
      await account.updateRecovery(
        String(userId),
        String(secret),
        password.newPassword,
        password.confirmNewPassword
      );
      router.push('/login');
      setIsLoading(false);
      toast.success('Votre mot de passe a bien été réinitialisé 👌');
    } catch (error) {
      toast.error('Ton lien de récupération a expiré 🤯');
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              placeholder="●●●●●●●●●●●●●●"
              pattern="^[a-zA-Z0-9!@#$%^&*_\-]{8,128}$"
              title="Le mot de passe doit contenir entre 8 et 128 caractères, et peut inclure des caractères alphabétiques, numériques et spéciaux."
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              onChange={(e) => {
                setPassword({
                  ...password,
                  newPassword: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="connfirmpassword"
              placeholder="●●●●●●●●●●●●●●"
              pattern="^[a-zA-Z0-9!@#$%^&*_\-]{8,128}$"
              title="Le mot de passe doit contenir entre 8 et 128 caractères, et peut inclure des caractères alphabétiques, numériques et spéciaux."
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              onChange={(e) => {
                setPassword({
                  ...password,
                  confirmNewPassword: e.target.value,
                });
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
  );
}
