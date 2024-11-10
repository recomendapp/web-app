import { Button } from '../ui/button';
import { Fragment } from 'react';
import { Users } from 'lucide-react';
import { useUI } from '@/context/ui-context';
import { RightPanelSocial } from '../sidebar/right-panel/RightPanelSocial';

export default function FollowedUserListButton() {
  const {
    toggleRightPanelContent,
  } = useUI();
  return (
    <Fragment>
      <Button
        variant="ghost"
        size={'icon'}
        className="rounded-full"
        onClick={() => toggleRightPanelContent(RightPanelSocial())}
      >
        <Users />
      </Button>
    </Fragment>
  );
}