import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { pocketbase } from './api/connects';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
          router.push('/login');
        }
      }, []);

    const isAuthenticated = () => {
        const user = pocketbase.authStore.isValid;
        if (user) {
            return true;
        } else {
            return false;
        }
    }
    return <Component {...pageProps} />
}