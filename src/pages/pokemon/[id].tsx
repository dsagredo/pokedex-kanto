import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '@/components/layouts';
import { Pokemon } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 border-blue-500/30 shadow-2xl p-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
                    <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
                        <Image
                            src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                            alt={pokemon.name}
                            width={350}
                            height={350}
                            className="drop-shadow-[0_0_50px_rgba(59,130,246,0.8)] hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 border-blue-500/30 shadow-2xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_60%)]"></div>

                        <div className="relative flex items-start justify-between mb-8">
                            <div>
                                <div className="text-sm font-black text-blue-400 mb-3 tracking-widest">
                                    #{String(pokemon.id).padStart(3, '0')}
                                </div>
                                <h1 className="text-6xl font-black capitalize bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                                    {pokemon.name}
                                </h1>
                            </div>
                            <button
                                onClick={() => onToggleFavorite(pokemon.id)}
                                className={`px-6 py-3 rounded-xl font-black text-sm transition-all duration-300 border-2 ${
                                    isFavorites
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)]'
                                        : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:border-blue-400'
                                }`}
                            >
                                {isFavorites ? '★ FAVORITO' : '☆ AGREGAR'}
                            </button>
                        </div>

                        <div className="relative grid grid-cols-2 gap-6">
                            <div className="bg-slate-700/30 rounded-xl p-5 border border-blue-500/20">
                                <h3 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">Altura</h3>
                                <p className="text-3xl font-black text-cyan-300">
                                    {pokemon.height / 10}<span className="text-xl text-slate-400 ml-1">m</span>
                                </p>
                            </div>
                            <div className="bg-slate-700/30 rounded-xl p-5 border border-blue-500/20">
                                <h3 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">Peso</h3>
                                <p className="text-3xl font-black text-cyan-300">
                                    {pokemon.weight / 10}<span className="text-xl text-slate-400 ml-1">kg</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 border-blue-500/30 shadow-2xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]"></div>
                        <h3 className="relative text-2xl font-black text-blue-300 mb-6 uppercase tracking-wider">Sprites</h3>
                        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={`${pokemon.name} frontal`}
                                    width={96}
                                    height={96}
                                    className="pixelated drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={`${pokemon.name} trasero`}
                                    width={96}
                                    height={96}
                                    className="pixelated drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={`${pokemon.name} shiny frontal`}
                                    width={96}
                                    height={96}
                                    className="pixelated drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 flex items-center justify-center border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={`${pokemon.name} shiny trasero`}
                                    width={96}
                                    height={96}
                                    className="pixelated drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]"
                                />
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
    return { props: { pokemon }, revalidate: 86400 };
};

export default PokemonPage;
