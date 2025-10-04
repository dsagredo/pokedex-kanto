import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <HeroUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="system">
                <Component {...pageProps} />
            </NextThemesProvider>
        </HeroUIProvider>
    );
};

export default App;
