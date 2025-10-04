import { Card, CardBody, CardFooter } from '@heroui/card';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { FC } from 'react';
import { SmallPokemon } from '@/interfaces/';
import { getPokemonTypeColors } from '@/utils/pokemonColors';

interface Props {
    pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router = useRouter();
    const colors = getPokemonTypeColors(pokemon.types);

    return (
        <Card
            className={`card-hover glow-hover bg-gradient-to-br ${colors.from} ${colors.to} border-2 ${colors.border} shadow-2xl overflow-hidden group`}
        >
            <CardBody className="p-0 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/10 ${colors.via}/5 ${colors.to}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className={`relative w-full aspect-square bg-gradient-to-br ${colors.from}/50 ${colors.to}/50 p-4 sm:p-6 lg:p-8 flex items-center justify-center`}>
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.glow.replace('0.6', '0.1')}, transparent 70%)` }}></div>
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                        <Image
                            src={pokemon.img}
                            alt={pokemon.name}
                            fill
                            className="relative z-10 group-hover:scale-110 transition-transform duration-500 object-contain"
                            style={{ filter: `drop-shadow(0 0 30px ${colors.glow})` }}
                            priority
                        />
                    </div>
                </div>
            </CardBody>
            <CardFooter className={`bg-slate-900/90 backdrop-blur-sm border-t ${colors.border} py-3 sm:py-4 px-3 sm:px-4`}>
                <div className="w-full space-y-2">
                    <h3 className={`text-sm sm:text-lg lg:text-xl font-black capitalize bg-gradient-to-r ${colors.text} bg-clip-text text-transparent text-center tracking-wide truncate`}>
                        {pokemon.name}
                    </h3>
                    {pokemon.height !== undefined && pokemon.weight !== undefined && (
                        <div className="grid grid-cols-2 gap-2">
                            <div className={`bg-slate-800/50 rounded-lg p-1.5 border ${colors.border} text-center`}>
                                <span className={`text-[8px] sm:text-[10px] font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent uppercase block`}>Altura</span>
                                <span className={`text-xs sm:text-sm font-black bg-gradient-to-r ${colors.text} bg-clip-text text-transparent block`}>{pokemon.height / 10}m</span>
                            </div>
                            <div className={`bg-slate-800/50 rounded-lg p-1.5 border ${colors.border} text-center`}>
                                <span className={`text-[8px] sm:text-[10px] font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent uppercase block`}>Peso</span>
                                <span className={`text-xs sm:text-sm font-black bg-gradient-to-r ${colors.text} bg-clip-text text-transparent block`}>{pokemon.weight / 10}kg</span>
                            </div>
                        </div>
                    )}
                    {pokemon.stats && (
                        <div className="grid grid-cols-3 gap-2">
                            {pokemon.stats.slice(0, 3).map((stat, index) => {
                                const statNames: Record<string, string> = {
                                    hp: 'HP',
                                    attack: 'ATK',
                                    defense: 'DEF',
                                };
                                return (
                                    <div key={index} className={`bg-slate-800/50 rounded-lg p-1.5 border ${colors.border} text-center`}>
                                        <span className={`text-[8px] sm:text-[10px] font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent uppercase block`}>
                                            {statNames[stat.stat.name] || stat.stat.name}
                                        </span>
                                        <span className={`text-xs sm:text-sm font-black bg-gradient-to-r ${colors.text} bg-clip-text text-transparent block`}>{stat.base_stat}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default PokemonCard;
