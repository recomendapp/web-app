'use client';
import { Separator } from '@/components/ui/separator';
import { SecurityForm } from '@/components/User/UserSettings/UserSettingsSecurity/securityForm';
import { siteConfig } from '@/config/site';

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sécurité</h3>
        <p className="text-sm text-muted-foreground text-justify">
          La modification de votre mot de passe vous déconnectera de toutes vos
          sessions {siteConfig.name} actives à l&apos;exception de celle que
          vous êtes en train d&apos;utiliser.
        </p>
      </div>
      <Separator />
      <SecurityForm />
    </div>
  );
}
