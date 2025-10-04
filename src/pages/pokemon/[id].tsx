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
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            },
        });
    };

    return (
        <Layout title={`${pokemon.name} - Pokédex`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 flex items-center justify-center">
                        <Image
                            src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                            alt={pokemon.name}
                            width={300}
                            height={300}
                            className="drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="text-sm font-bold text-slate-500 mb-2">
                                    #{String(pokemon.id).padStart(3, '0')}
                                </div>
                                <h1 className="text-5xl font-black capitalize text-slate-800">
                                    {pokemon.name}
                                </h1>
                            </div>
                            <button
                                onClick={() => onToggleFavorite(pokemon.id)}
                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                                    isFavorites
                                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                }`}
                            >
                                {isFavorites ? '❤️ Favorito' : '🤍 Agregar'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Altura</h3>
                                <p className="text-2xl font-semibold text-slate-600">
                                    {pokemon.height / 10} m
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Peso</h3>
                                <p className="text-2xl font-semibold text-slate-600">
                                    {pokemon.weight / 10} kg
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Sprites</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 flex items-center justify-center border border-slate-200">
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={`${pokemon.name} frontal`}
                                    width={96}
                                    height={96}
                                    className="pixelated"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 flex items-center justify-center border border-slate-200">
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={`${pokemon.name} trasero`}
                                    width={96}
                                    height={96}
                                    className="pixelated"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 flex items-center justify-center border border-slate-200">
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={`${pokemon.name} shiny frontal`}
                                    width={96}
                                    height={96}
                                    className="pixelated"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 flex items-center justify-center border border-slate-200">
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={`${pokemon.name} shiny trasero`}
                                    width={96}
                                    height={96}
                                    className="pixelated"
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
