import { useRightSidebar } from '@/context/right-sidebar-context';
import { Button } from '../ui/button';
import { Fragment, useEffect, useRef, useState } from 'react';
import FriendsList from '../Friends/FriendsList';
import { Users } from 'lucide-react';

import './styles/style.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function FollowedUserListButton() {
  const {
    isOpen: isOpenSidebar,
    openPanel,
    closePanel,
    setPanelContent,
    panelTitle,
    setPanelTitle,
  } = useRightSidebar();

  return (
    <Fragment>
      <Button
        variant="ghost"
        size={'icon'}
        className="rounded-full hidden lg:inline-flex"
        onClick={() => {
          if (isOpenSidebar && panelTitle != 'Amis') {
            setPanelTitle('Suivis');
            setPanelContent(<FriendsList />);
          } else if (isOpenSidebar) {
            closePanel();
          } else {
            setPanelTitle('Suivis');
            setPanelContent(<FriendsList />);
            openPanel();
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
  return (
    <div className="lg:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <Users />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-2/3">
          <DialogHeader>
            <DialogTitle>Follow</DialogTitle>
          </DialogHeader>
          <FriendsList />
        </DialogContent>
      </Dialog>
    </div>
  );
}
