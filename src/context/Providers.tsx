import { ApolloClientContext } from "@/context/apollo-client-context";
import { AuthContext } from "@/context/AuthContext/auth-context";
import { ReactQueryContext } from "@/context/react-query-context";
import { ThemeContext } from "@/context/theme-context";
import { RightSidebarContext } from "@/context/right-sidebar-context";
import { OneSignalContext } from "@/context/one-signal-context";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Provider ({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        <ReactQueryContext>
            <ApolloClientContext>
                <AuthContext>
                    <ThemeContext attribute="class" defaultTheme="dark" enableSystem>
                        <OneSignalContext>
                            <RightSidebarContext>
                                <NextTopLoader 
                                    showSpinner={false}
                                    easing='ease'
                                    color='#FFE974'
                                    height={2}
                                />
                                <Toaster
                                    position="top-center"
                                />
                                <SpeedInsights />
                                {children}
                            </RightSidebarContext>
                        </OneSignalContext>
                    </ThemeContext>
                </AuthContext>
            </ApolloClientContext>
        </ReactQueryContext>
    )
}