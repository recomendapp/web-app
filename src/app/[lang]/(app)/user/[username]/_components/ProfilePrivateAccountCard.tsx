import { LockIcon } from "lucide-react";

const ProfilePrivateAccountCard = () => {
	return (
		<div className='flex gap-4 justify-center items-center px-4 py-8 border-y-2'>
      <LockIcon />
      <div>
        <div>
          Ce compte est privé
        </div>
        <span className=' text-muted-foreground'>
          Suivez ce compte pour voir ses activités
        </span>
      </div>
    </div>
	);
};

export default ProfilePrivateAccountCard;