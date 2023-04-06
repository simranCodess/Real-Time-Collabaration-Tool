import '@/styles/globals.css'
import { ThemeProvider } from "@material-tailwind/react";
import Head from 'next/head';
import "../styles.css"
import { SessionProvider } from 'next-auth/react';


function App({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </Head>
            <SessionProvider session={pageProps.session}>

                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>
    );
}

export default App;
