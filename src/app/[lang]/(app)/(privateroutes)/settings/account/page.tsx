'use client'

import { Separator } from '@/components/ui/separator';
import { AccountForm } from '@/app/[lang]/(app)/(privateroutes)/settings/account/_components/accountForm';
import AccountDelete from './_components/accountDelete';
import { useT } from '@/lib/i18n/client';

export default function SettingsAccountPage() {
  const { t } = useT();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('pages.settings.account.label')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('pages.settings.account.description')}
        </p>
      </div>
      <Separator />
      <AccountForm />
      <AccountDelete />
    </div>
  );
}
