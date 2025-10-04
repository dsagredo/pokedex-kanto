import { Card, CardBody, CardFooter } from '@heroui/card';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { FC } from 'react';
import { SmallPokemon } from '@/interfaces';

interface Props {
    pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router = useRouter();

    return (
        <Card
            isPressable
            isHoverable
            onClick={() => router.push(`/name/${pokemon.name}`)}
            className="card-hover glow-hover bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 shadow-2xl overflow-hidden group"
        >
            <CardBody className="p-0 relative">
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 bg-slate-950/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-blue-400/50">
                    <span className="text-[10px] sm:text-xs font-black text-blue-400">#{String(pokemon.id).padStart(3, '0')}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative w-full aspect-square bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                        <Image
                            src={pokemon.img}
                            alt={pokemon.name}
                            fill
                            className="drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] relative z-10 group-hover:scale-110 transition-transform duration-500 object-contain"
                            priority
                        />
                    </div>
                </div>
            </CardBody>
            <CardFooter className="bg-slate-900/90 backdrop-blur-sm border-t border-blue-500/20 py-3 sm:py-4 px-3 sm:px-4">
                <div className="w-full">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-black capitalize bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent text-center tracking-wide truncate">
                        {pokemon.name}
                    </h3>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PokemonCard;
