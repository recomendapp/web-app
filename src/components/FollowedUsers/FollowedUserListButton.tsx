import { useRightSidebar } from "@/context/RightSidebarContext/RightSidebarContext";
import { Button } from "../ui/button";
import { Fragment, useEffect, useRef, useState } from "react";
import FriendsList from "../Friends/FriendsLists";
import { Users } from "lucide-react";

import { BottomSheet } from 'react-spring-bottom-sheet';
import './styles/style.css';
// import 'react-spring-bottom-sheet/dist/style.css';

export default function FollowedUserListButton() {
    const { isOpen: isOpenSidebar, openPanel, closePanel, setPanelContent, panelTitle, setPanelTitle } = useRightSidebar();

    return (
        <Fragment>
            <Button
                variant="ghost"
                size={'icon'}
                className="rounded-full hidden lg:inline-flex"
                onClick={() => {
                if (isOpenSidebar && panelTitle != 'Amis') {
                    setPanelTitle('Amis')
                    setPanelContent(<FriendsList />)
                } else if (isOpenSidebar) {
                    closePanel();
                } else {
                    setPanelTitle('Amis')
                    setPanelContent(<FriendsList />)
                    openPanel()
                }
                }}
            >
                <Users />
            </Button>
            <FollowedUserListBottomSheet />
        </Fragment>
    )
}

export function FollowedUserListBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
        <div className="lg:hidden">
            <Button
                variant={'ghost'}
                size={'icon'}
                className="rounded-full"
                onClick={() => setOpen(!open)}
            >
                <Users />
            </Button>
            <BottomSheet
                open={open}
                onDismiss={() => setOpen(false)}
                snapPoints={({ maxHeight }) => [0.80 * maxHeight, 0.83 * maxHeight]}
                defaultSnap={0.83}
                // blocking={false}
                className="lg:hidden"
            >
                <p className="text-center text-2xl">Follow</p>
                <div className=" container">
                    <FriendsList />
                </div>
            </BottomSheet>
        </div>
    );
}