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
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-800 mb-2">
                    Descubre todos los Pokémon
                </h2>
                <p className="text-slate-600 text-lg">
                    Explora los 151 Pokémon de la primera generación
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
