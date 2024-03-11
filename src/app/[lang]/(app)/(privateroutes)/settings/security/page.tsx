'use client';
import { Separator } from '@/components/ui/separator';
import { SecurityForm } from '@/app/[lang]/(app)/(privateroutes)/settings/security/_components/securityForm';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';

export default function SettingsSecurityPage() {
  const t = useTranslations('settings');
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('security.label')}</h3>
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
