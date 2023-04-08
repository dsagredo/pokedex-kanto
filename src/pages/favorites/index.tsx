import { useState, useEffect } from 'react';
import { Layout } from '@/components/layouts';
import NoFavorites from '@/components/ui/NoFavorites';
import { localFavorites } from '@/utils';
import { Card, Grid } from '@nextui-org/react';

const FavoritesPage = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemonFavorites());
    }, []);

    return (
        <Layout title="Pokemons - Favoritos">
            {favoritePokemons.length === 0 ? (
                <NoFavorites />
            ) : (
                <Grid.Container gap={6} direction="row" justify="flex-start">
                    {favoritePokemons.map((id) => (
                        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
                            <Card isHoverable isPressable css={{ padding: 10 }}>
                                <Card.Image
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                                    width={'100%'}
                                    height={140}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            )}
        </Layout>
    );
};

export default FavoritesPage;
