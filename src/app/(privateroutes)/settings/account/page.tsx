'use client';
import { Separator } from '@/components/ui/separator';
import { AccountForm } from '@/app/(privateroutes)/settings/account/accountForm';

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Compte</h3>
        {/* <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p> */}
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
