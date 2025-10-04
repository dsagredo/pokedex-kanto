import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <Link href="/" passHref className="flex items-center gap-3 group w-fit">
                    <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                            alt="Logo de Pokémon"
                            width={56}
                            height={56}
                            className="drop-shadow-lg"
                        />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Pokédex
                        </h1>
                        <span className="text-sm font-medium text-slate-500">Gen I</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};
