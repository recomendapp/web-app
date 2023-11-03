'use client';
import { Separator } from '@/components/ui/separator';
import { AccountForm } from '@/components/Settings/UserSettingsAccount/accountForm';
import { useTranslations } from 'next-intl';

export default function SettingsAccountPage() {
  const t = useTranslations('settings');
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('account.label')}</h3>
        <p className="text-sm text-muted-foreground">
          {t('account.description')}
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
