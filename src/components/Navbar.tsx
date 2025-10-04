import Image from 'next/image';
import Link from 'next/link';

export const Navbar = (): JSX.Element => {
    return (
        <div className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/80 border-b border-blue-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5">
                <Link href="/" passHref className="flex items-center gap-3 sm:gap-4 group w-fit">
                    <div className="relative w-14 h-14 sm:w-20 sm:h-20 transition-all duration-500 group-hover:scale-110 drop-shadow-2xl flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative z-10 w-full h-full bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 rounded-2xl p-1 shadow-2xl">
                            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                                <Image
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                                    alt="Logo Pokédex"
                                    width={56}
                                    height={56}
                                    className="w-10 h-10 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                            POKÉDEX
                        </h1>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase">
                            Kanto Region
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};
