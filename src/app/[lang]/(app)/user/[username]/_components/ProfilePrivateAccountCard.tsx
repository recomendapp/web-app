import { useT } from "@/lib/i18n/client";
import { upperFirst } from "lodash";
import { LockIcon } from "lucide-react";

export const ProfilePrivateAccountCard = () => {
  const { t } = useT();
	return (
		<div className='flex gap-4 justify-center items-center px-4 py-8 border-y-2'>
      <LockIcon />
      <div>
        <div>
        {upperFirst(t('common.messages.this_account_is_private'))}
        </div>
        <span className=' text-muted-foreground'>
        {upperFirst(t('common.messages.follow_to_see_activities'))}
        </span>
      </div>
    </div>
	);
};