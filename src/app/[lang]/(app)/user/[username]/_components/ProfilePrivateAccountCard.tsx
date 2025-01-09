import { upperFirst } from "lodash";
import { LockIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const ProfilePrivateAccountCard = () => {
  const common = useTranslations('common');
	return (
		<div className='flex gap-4 justify-center items-center px-4 py-8 border-y-2'>
      <LockIcon />
      <div>
        <div>
        {upperFirst(common('messages.this_account_is_private'))}
        </div>
        <span className=' text-muted-foreground'>
        {upperFirst(common('messages.follow_to_see_activities'))}
        </span>
      </div>
    </div>
	);
};

export default ProfilePrivateAccountCard;