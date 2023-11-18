import { ApolloClientContext } from "@/context/apollo-client-context";
import { AuthContext } from "@/context/AuthContext/auth-context";
import { ReactQueryContext } from "@/context/react-query-context";
import { ThemeContext } from "@/context/theme-context";
import { RightSidebarContext } from "@/context/right-sidebar-context";
import { OneSignalContext } from "@/context/one-signal-context";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

export default function Provider ({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        <ApolloClientContext>
            <AuthContext>
                <ReactQueryContext>
                    <ThemeContext attribute="class" defaultTheme="dark" enableSystem>
                        <OneSignalContext>
                            <RightSidebarContext>
                                <NextTopLoader 
                                    showSpinner={false}
                                    easing='ease'
                                    color='#FFE974'
                                    height={2}
                                />
                                <ToastContainer
                                    position="top-center"
                                    theme="dark"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    pauseOnHover={false}
                                    draggable
                                    closeOnClick
                                />
                                {children}
                            </RightSidebarContext>
                        </OneSignalContext>
                    </ThemeContext>
                </ReactQueryContext>
            </AuthContext>
        </ApolloClientContext>
    )
}