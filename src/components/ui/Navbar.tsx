import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-800">
            <Link href="/" passHref className="flex items-center gap-1">
                <Image
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                    alt="Logo de Pokémon"
                    width={50}
                    height={50}
                />
                <h2 className="text-xl font-bold text-white">P</h2>
                <h3 className="text-lg text-white">okémon</h3>
            </Link>
        </div>
    );
};
