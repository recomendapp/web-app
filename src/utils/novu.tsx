import { NovuProvider, PopoverNotificationCenter, NotificationBell } from "@novu/notification-center"

export default function Novu( { userId } : { userId: string }) {
    return (
        <NovuProvider subscriberId={userId} applicationIdentifier={'hWF2KQ3RBUC4'}>
            <PopoverNotificationCenter colorScheme={'dark'} onActionClick={(triggerId: string, button: string, data) => action(triggerId, button, data)}>
                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
        </NovuProvider>
    )
}

function action(triggerId: string, button: string, data: any) {
    console.log("triggerId", triggerId)
    console.log("button", button)
    console.log('data', data)
}