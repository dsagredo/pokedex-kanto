import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Pokédex - Primera Generación',
    description: 'Explora los 151 Pokémon legendarios de Kanto',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
