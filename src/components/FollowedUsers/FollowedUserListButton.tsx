import { useRightSidebar } from '@/context/right-sidebar-context';
import { Button } from '../ui/button';
import { Fragment, useEffect, useRef, useState } from 'react';
import FriendsList from '../RightSidebar/FriendsList';
import { Users } from 'lucide-react';

import './styles/style.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useUI } from '@/context/ui-context';
import { Modal } from '../Modals/Modal';
import { useModal } from '@/context/modal-context';

export default function FollowedUserListButton() {
  const {
    isRightPanelCollapsed,
    expandRightPanel,
    collapseRightPanel,
    rightPanelTitle,
    setRightPanelTitle,
    setRightPanelContent,
  } = useUI();
  return (
    <Fragment>
      <Button
        variant="ghost"
        size={'icon'}
        className="rounded-full hidden lg:inline-flex"
        onClick={() => {
          if (!isRightPanelCollapsed && rightPanelTitle != 'Suivis') {
            setRightPanelTitle('Suivis');
            setRightPanelContent(<FriendsList />);
          } else if (!isRightPanelCollapsed) {
            collapseRightPanel();
          } else {
            setRightPanelTitle('Suivis');
            setRightPanelContent(<FriendsList />);
            expandRightPanel();
          }
        }}
      >
        <Users />
      </Button>
      <FollowedUserListBottomSheet />
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
        onClick={() => createModal({
          header: {
            title: 'Suivis',
          },
          content: <FriendsList />,
        })}
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
