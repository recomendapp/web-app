import { ApolloClientProvider } from "@/context/ApolloClientProvider";
import { AuthProvider } from "@/context/AuthContext/AuthProvider";
import { ReactQueryProvider } from "@/context/ReactQueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider/ThemeProvider";
import { RightSidebarProvider } from "@/context/RightSidebarContext/RightSidebarContext";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";

export default function Provider ({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        <ApolloClientProvider>
            <AuthProvider>
                <ReactQueryProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                        <RightSidebarProvider>
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
                        </RightSidebarProvider>
                    </ThemeProvider>
                </ReactQueryProvider>
            </AuthProvider>
        </ApolloClientProvider>
    )
}