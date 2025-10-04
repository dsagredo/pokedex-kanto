import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-start w-full px-5 bg-gray-200 dark:bg-gray-800">
            {/* Logo */}
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="icono de la app"
                width={70}
                height={70}
            />

            {/* Título */}
            <Link href="/" className="inline-flex items-baseline ml-2">
                <span className="text-gray-900 dark:text-white text-3xl font-bold">P</span>
                <span className="text-gray-900 dark:text-white text-2xl">okémon</span>
            </Link>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Link Favoritos */}
            <Link
                href="/favorites"
                className="text-gray-900 dark:text-white hover:text-yellow-400 transition-colors mr-4"
            >
                Favoritos
            </Link>
        </nav>
    );
};
