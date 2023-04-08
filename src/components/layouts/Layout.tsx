import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props {
    title?: string;
    children?: React.ReactNode;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon APP'}</title>
                <meta name="author" content="Diego Sagredo" />
            </Head>
            <Navbar />
            <main style={{ padding: '0 20px' }}>{children}</main>
        </>
    );
};
