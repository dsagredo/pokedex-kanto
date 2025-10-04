import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/80 border-b border-blue-500/20">
            <div className="max-w-7xl mx-auto px-6 py-5">
                <Link href="/" passHref className="flex items-center gap-4 group w-fit">
                    <div className="relative w-16 h-16 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] drop-shadow-2xl">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-400/40 transition-all duration-500"></div>
                        <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                            alt="Logo de Pokémon"
                            width={64}
                            height={64}
                            className="relative z-10"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
                            POKÉDEX
                        </h1>
                        <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Generation I</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};
