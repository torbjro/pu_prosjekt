import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { pocketbase } from './api/connects';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Login from './login';
import Loading from './loading';
import Register from './register';
import Layout from '@/components/stories/Dashboard/Layout';


export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const [auth, setAuth ] = useState(false);
    const [loading, setLoading] = useState(true);
    const [register, setRegister] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (router.pathname == '/register') {
            setRegister(true);
        }
        if (router.pathname !== '/login' && router.pathname !== '/register') {
            if (!pocketbase.authStore.isValid) {
                router.push('/login');
            }
            if (pocketbase.authStore.isValid) {
                setAuth(true);
            }
        }
        setLoading(false);
    }, [router, router.pathname]);

    if (loading) {
        return (
            <Loading />
        )       
    }
    if (auth) {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )
    }
    else if (register) {
        return (
            <Register />
        )
    }
    else {
        return (
            <Login />
        )
    }
        

    
}