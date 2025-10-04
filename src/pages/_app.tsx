import type { AppProps } from 'next/app';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={inter.className}>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <HeroUIProvider>
                    <Component {...pageProps} />
                </HeroUIProvider>
            </NextThemesProvider>
        </main>
    );
}
