import "../styles/globals.css";
import AuthProvider from "../context/AuthProvider";
import "@fontsource/poppins";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from "next/router";

const publicRoute = ["/", "/register"];

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
        <AuthProvider>
            {publicRoute.includes(router.pathname) ? (
                <div className="mx-20">
                    <Component {...pageProps} />
                </div>
            ) : (
                <ProtectedRoute>
                    <div className="mx-20 bg-websiteWhite">
                        <Component {...pageProps} />
                    </div>
                </ProtectedRoute>
            )}
        </AuthProvider>
    );
}

export default MyApp;
