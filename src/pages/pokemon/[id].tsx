import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { Pokemon } from '@/interfaces';
// import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '@/utils';
//import confetti from 'canvas-confetti';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const [isFavorites] = useState(localFavorites.existInFavorites(pokemon.id));
    console.log('isFavorites ', isFavorites);
    /*const onToggleFavorite = (id: number) => {
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
    };*/

    return (
        <Layout title={pokemon.name}>
            {/*<Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={
                                    pokemon.sprites.other?.dream_world.front_default ||
                                    '/no-image.png'
                                }
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">
                                {pokemon.name}
                            </Text>
                            <Button
                                color="gradient"
                                ghost={!isFavorites}
                                onPress={() => onToggleFavorite(pokemon.id)}
                            >
                                {isFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites: </Text>
                            <Container direction="row" display="flex" gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>*/}
            <p>Hola</p>
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
