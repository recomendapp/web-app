'use client'

import { Separator } from '@/components/ui/separator';
import { SecurityForm } from './_components/securityForm';
import { useT } from '@/lib/i18n/client';

export default function SettingsSecurityPage() {
  const { t } = useT();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('pages.settings.security.label')}</h3>
        <p className="text-sm text-muted-foreground text-justify">{t('pages.settings.security.description')}</p>
      </div>
      <Separator />
      <SecurityForm />
    </div>
  );
}
