import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { pocketbase } from './api/connects';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Login from './login';


export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== '/login') {
            if (!pocketbase.authStore.isValid) {
                router.push('/login');
            }
            else {
                router.push('/dashboard');
            }
        }
    }, [router.pathname]);
    
    return (
        <Component {...pageProps} />
    )
}