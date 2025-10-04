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
                <title>{title || 'Pokédex - Descubre todos los Pokémon'}</title>
                <meta name="author" content="Diego Sagredo" />
                <meta name="description" content="Explora la primera generación de Pokémon con nuestra Pokédex interactiva" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {children}
            </main>
        </>
    );
};
