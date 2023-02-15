import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { pocketbase } from './api/connects';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Login from './login';
import Loading from './loading';


export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const [auth, setAuth ] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (router.pathname !== '/login') {
            if (!pocketbase.authStore.isValid) {
                router.push('/login');
            }
            if (pocketbase.authStore.isValid) {
                setAuth(true);
            }
        }
        setLoading(false);
    }, [router.pathname]);

    if (loading) {
        return (
            <Loading />
        )       
    }
    if (auth) {
        return (
            <Component {...pageProps} />
        )
    }
    else {
        return (
            <Login />
        )
    }
        

    
}