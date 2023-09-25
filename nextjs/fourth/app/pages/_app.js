import { SessionProvider } from "next-auth/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider>
            <div className="m-10">
                <Header />
                <Component {...pageProps} />
                <Footer />
            </div>
        </SessionProvider>
    );
}

export default MyApp;
