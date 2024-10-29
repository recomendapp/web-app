import { Button } from '../ui/button';
import { Fragment, useState } from 'react';
import { Users } from 'lucide-react';

import { useUI } from '@/context/ui-context';
import { useModal } from '@/context/modal-context';

export default function FollowedUserListButton() {
  const {
    toggleRightPanel,
  } = useUI();
  // const {
  //   isRightPanelCollapsed,
  //   expandRightPanel,
  //   collapseRightPanel,
  //   rightPanelTitle,
  //   setRightPanelTitle,
  //   setRightPanelContent,
  // } = useUI();
  return (
    <Fragment>
      <Button
        variant="ghost"
        size={'icon'}
        className="rounded-full"
        onClick={toggleRightPanel}
      >
        <Users />
      </Button>
      {/* <FollowedUserListBottomSheet /> */}
    </Fragment>
  );
}

export function FollowedUserListBottomSheet() {
  const { createModal } = useModal();
  const [openFollowing, setOpenFollowing] = useState(false);

  
  return (
    <div className='lg:hidden'>
      <Button
        variant={'ghost'}
        size={'icon'}
        // onClick={() => createModal({
        //   header: {
        //     title: 'Suivis',
        //   },
        //   content: <FriendsList />,
        // })}
        className="rounded-full"
      >
        <Users />
      </Button>
    </div>
    // <div className="lg:hidden">
    //   <Dialog>
    //     <DialogTrigger asChild>
    //       <Button variant={'ghost'} size={'icon'} className="rounded-full">
    //         <Users />
    //       </Button>
    //     </DialogTrigger>
    //     <DialogContent className="h-2/3">
    //       <DialogHeader>
    //         <DialogTitle>Follow</DialogTitle>
    //       </DialogHeader>
    //       <FriendsList />
    //     </DialogContent>
    //   </Dialog>
    // </div>
  );
}
