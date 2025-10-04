import type { NextPage, GetStaticProps } from 'next';
import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { SmallPokemon } from '@/interfaces';
import PokemonCard from '@/components/pokemon/PokemonCard';
interface Props {
    pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }): JSX.Element => {
    return (
        <Layout title="Pokédex - Primera Generación">
            <div className="mb-8 sm:mb-12 text-center space-y-4 sm:space-y-6">
                <div className="inline-block px-4">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight drop-shadow-2xl">
                        POKÉDEX KANTO
                    </h1>
                    <div className="h-1 sm:h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full shadow-lg"></div>
                </div>
                <p className="text-slate-400 text-base sm:text-xl font-medium max-w-2xl mx-auto px-4">
                    Explora los 151 Pokémon legendarios de Kanto
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
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
  const pokemons: SmallPokemon[] = [];

  for (let i = 0; i < 151; i += 20) {
    const batchPromises = Array.from(
      { length: Math.min(20, 151 - i) },
      (_, j) => pokeApi.get(`pokemon/${i + j + 1}`)
    );

    const results = await Promise.all(batchPromises);
    
    results.forEach((res, index) => {
      const id = i + index + 1;
      pokemons.push({
        ...res.data,
        id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      });
    });
  }

  return {
    props: {
      pokemons,
    },
  };

};

export default Home;
