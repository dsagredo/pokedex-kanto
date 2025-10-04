import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '@/components/layouts';
import { Pokemon } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';
import { getPokemonDetails, PokemonDetails } from '@/lib/supabase';

interface Props {
    pokemon: Pokemon;
    pokemonDetails: PokemonDetails | null;
}

const PokemonPage: NextPage<Props> = ({ pokemon, pokemonDetails }) => {
    const [isFavorites, setFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    const onToggleFavorite = (id: number) => {
        localFavorites.toggleFavorite(id);
        setFavorites(!isFavorites);

        if (isFavorites) return;
        confetti({
            zIndex: 999,
            particleCount: 150,
            spread: 180,
            angle: 90,
            origin: {
                x: 0.5,
                y: 0.5,
            },
            colors: ['#3B82F6', '#06B6D4', '#14B8A6', '#22D3EE'],
        });
    };

    return (
        <Layout title={`${pokemon.name} - Pokédex`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
                    <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 flex items-center justify-center min-h-[250px] sm:min-h-[350px] lg:min-h-[400px]">
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                            <Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                fill
                                className="drop-shadow-[0_0_50px_rgba(59,130,246,0.8)] hover:scale-110 transition-transform duration-500 object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_60%)]"></div>

                        <div className="relative flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 sm:mb-8">
                            <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm font-black text-blue-400 mb-2 sm:mb-3 tracking-widest">
                                    #{String(pokemon.id).padStart(3, '0')}
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black capitalize bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent break-words">
                                    {pokemon.name}
                                </h1>
                            </div>
                            <button
                                onClick={() => onToggleFavorite(pokemon.id)}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 border-2 whitespace-nowrap self-start sm:self-auto ${
                                    isFavorites
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)]'
                                        : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:border-blue-400'
                                }`}
                            >
                                {isFavorites ? '★ FAVORITO' : '☆ AGREGAR'}
                            </button>
                        </div>

                        <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-slate-700/30 rounded-xl p-4 sm:p-5 border border-blue-500/20">
                                <h3 className="text-xs sm:text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">Altura</h3>
                                <p className="text-2xl sm:text-3xl font-black text-cyan-300">
                                    {pokemon.height / 10}<span className="text-base sm:text-xl text-slate-400 ml-1">m</span>
                                </p>
                            </div>
                            <div className="bg-slate-700/30 rounded-xl p-4 sm:p-5 border border-blue-500/20">
                                <h3 className="text-xs sm:text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">Peso</h3>
                                <p className="text-2xl sm:text-3xl font-black text-cyan-300">
                                    {pokemon.weight / 10}<span className="text-base sm:text-xl text-slate-400 ml-1">kg</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {pokemonDetails && (
                        <>
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]"></div>
                                <h3 className="relative text-xl sm:text-2xl font-black text-blue-300 mb-4 sm:mb-6 uppercase tracking-wider">Estadísticas</h3>
                                <div className="relative space-y-3">
                                    {pokemonDetails.stats.map((statItem, index) => (
                                        <div key={index} className="bg-slate-700/30 rounded-lg p-3 sm:p-4 border border-blue-500/20">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider">
                                                    {statItem.stat.name.replace('-', ' ')}
                                                </span>
                                                <span className="text-lg sm:text-xl font-black text-cyan-300">{statItem.base_stat}</span>
                                            </div>
                                            <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min((statItem.base_stat / 255) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]"></div>
                                <h3 className="relative text-xl sm:text-2xl font-black text-blue-300 mb-4 sm:mb-6 uppercase tracking-wider">Habilidades</h3>
                                <div className="relative flex flex-wrap gap-3">
                                    {pokemonDetails.abilities.map((abilityItem, index) => (
                                        <div
                                            key={index}
                                            className={`px-4 py-2 rounded-lg font-bold text-sm border-2 ${
                                                abilityItem.is_hidden
                                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400/50 text-purple-300'
                                                    : 'bg-slate-700/30 border-blue-500/30 text-cyan-300'
                                            }`}
                                        >
                                            {abilityItem.ability.name.replace('-', ' ')}
                                            {abilityItem.is_hidden && <span className="ml-2 text-xs">(Oculta)</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]"></div>
                                <h3 className="relative text-xl sm:text-2xl font-black text-blue-300 mb-4 sm:mb-6 uppercase tracking-wider">Tipos</h3>
                                <div className="relative flex flex-wrap gap-3">
                                    {pokemonDetails.types.map((typeItem, index) => {
                                        const typeColors: Record<string, string> = {
                                            normal: 'from-gray-400 to-gray-600',
                                            fire: 'from-orange-500 to-red-600',
                                            water: 'from-blue-500 to-cyan-600',
                                            electric: 'from-yellow-400 to-yellow-600',
                                            grass: 'from-green-500 to-emerald-600',
                                            ice: 'from-cyan-400 to-blue-500',
                                            fighting: 'from-red-600 to-orange-700',
                                            poison: 'from-purple-500 to-violet-600',
                                            ground: 'from-yellow-600 to-amber-700',
                                            flying: 'from-indigo-400 to-sky-500',
                                            psychic: 'from-pink-500 to-purple-600',
                                            bug: 'from-lime-500 to-green-600',
                                            rock: 'from-yellow-700 to-stone-600',
                                            ghost: 'from-purple-600 to-indigo-700',
                                            dragon: 'from-indigo-600 to-purple-700',
                                            dark: 'from-gray-700 to-gray-900',
                                            steel: 'from-gray-400 to-slate-500',
                                            fairy: 'from-pink-400 to-rose-500',
                                        };
                                        const gradient = typeColors[typeItem.type.name] || 'from-gray-500 to-gray-700';
                                        return (
                                            <div
                                                key={index}
                                                className={`px-6 py-3 rounded-lg font-black text-base bg-gradient-to-r ${gradient} text-white shadow-lg uppercase tracking-wider`}
                                            >
                                                {typeItem.type.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]"></div>
                                <h3 className="relative text-xl sm:text-2xl font-black text-blue-300 mb-4 sm:mb-6 uppercase tracking-wider">Experiencia Base</h3>
                                <div className="relative bg-slate-700/30 rounded-xl p-5 border border-blue-500/20 text-center">
                                    <p className="text-4xl sm:text-5xl font-black text-cyan-300">
                                        {pokemonDetails.base_experience}
                                        <span className="text-lg sm:text-xl text-slate-400 ml-2">XP</span>
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl border-2 border-blue-500/30 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]"></div>
                        <h3 className="relative text-xl sm:text-2xl font-black text-blue-300 mb-4 sm:mb-6 uppercase tracking-wider">Sprites</h3>
                        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-3 sm:p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                    <Image
                                        src={pokemon.sprites.front_default}
                                        alt={`${pokemon.name} frontal`}
                                        fill
                                        className="pixelated drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-3 sm:p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                    <Image
                                        src={pokemon.sprites.back_default}
                                        alt={`${pokemon.name} trasero`}
                                        fill
                                        className="pixelated drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-3 sm:p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                    <Image
                                        src={pokemon.sprites.front_shiny}
                                        alt={`${pokemon.name} shiny frontal`}
                                        fill
                                        className="pixelated drop-shadow-[0_0_15px_rgba(234,179,8,0.7)] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-3 sm:p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                    <Image
                                        src={pokemon.sprites.back_shiny}
                                        alt={`${pokemon.name} shiny trasero`}
                                        fill
                                        className="pixelated drop-shadow-[0_0_15px_rgba(234,179,8,0.7)] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const pokemonIds = [...Array(151)].map((_value, index) => `${index + 1}`);

    return {
        paths: pokemonIds.map((id) => ({
            params: { id },
        })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const pokemon = await getPokemonInfo(id);
    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const pokemonDetails = await getPokemonDetails(id);

    return { props: { pokemon, pokemonDetails }, revalidate: 86400 };
};

export default PokemonPage;
