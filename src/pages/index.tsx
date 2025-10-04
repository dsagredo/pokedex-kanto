import type { NextPage, GetStaticProps } from 'next';
import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import PokemonCard from '@/components/pokemon/PokemonCard';
interface Props {
    pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }): JSX.Element => {
    return (
        <Layout title="Pokédex - Primera Generación">
            <div className="mb-12 text-center space-y-4">
                <div className="inline-block">
                    <h2 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-3 tracking-tight">
                        PRIMERA GENERACIÓN
                    </h2>
                    <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>
                <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                    Explora los 151 Pokémon legendarios de Kanto
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {pokemons.map(
                    (pokemon): JSX.Element => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ),
                )}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151');

    const pokemons: SmallPokemon[] = data.results.map((value, index) => ({
        ...value,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            index + 1
        }.svg`,
    }));

    return {
        props: {
            pokemons,
        },
    };
};

export default Home;
