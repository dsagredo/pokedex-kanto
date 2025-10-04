import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Navbar } from '@/components/Navbar';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pokédex Kanto - 151 Pokémon de Primera Generación',
    description: 'Explora la Pokédex completa de Kanto con los 151 Pokémon originales. Descubre estadísticas, habilidades, tipos y más información detallada de cada Pokémon de la primera generación.',
    keywords: ['pokémon', 'pokédex', 'kanto', 'primera generación', 'pokémon red', 'pokémon blue', 'estadísticas pokémon', 'tipos pokémon'],
    authors: [{ name: 'Diego Sagredo' }],
    creator: 'Pokédex Kanto',
    publisher: 'Pokédex Kanto',
    openGraph: {
        title: 'Pokédex Kanto - 151 Pokémon de Primera Generación',
        description: 'Explora la Pokédex completa de Kanto con los 151 Pokémon originales. Descubre estadísticas, habilidades, tipos y más.',
        type: 'website',
        locale: 'es_ES',
        siteName: 'Pokédex Kanto',
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es">
            <head>
                <link rel="canonical" href="https://pokedex-kanto.com" />
                <meta name="theme-color" content="#0f172a" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'Pokédex Kanto',
                            description: 'Pokédex completa de los 151 Pokémon de la primera generación',
                            url: 'https://pokedex-kanto.com',
                            inLanguage: 'es',
                        }),
                    }}
                />
            </head>
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">{children}</div>
                </main>
            </body>
        </html>
    );
}
