'use client'

import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from './_components/appearanceForm';
import { useT } from '@/lib/i18n/client';

export default function SettingsAppearancePage() {
  const { t } = useT();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('pages.settings.appearance.label')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('pages.settings.appearance.description')}
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
