import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces';
import { pokeApi } from '@/api';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { localFavorites } from '@/utils';

interface Props {
    pokemon: Pokemon,
}

const PokemonPage: NextPage<Props> = ({ pokemon: { name, sprites, id } }) => {

    const [isFavorites, setFavorites] = useState(localFavorites.existInFavorites(id));

    const onToggleFavorite = (id: number) => {
        localFavorites.toggleFavorite(id);
        setFavorites(!isFavorites);
    }

    return (
        <Layout title={name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{name}</Text>
                            <Button
                                color='gradient'
                                ghost={!isFavorites}
                                onPress={() => onToggleFavorite(id)}
                            >
                                {isFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites: </Text>
                            <Container direction='row' display='flex' gap={0}>
                                <Image src={sprites.front_default} alt={name} width={100} height={100} />
                                <Image src={sprites.back_default} alt={name} width={100} height={100} />
                                <Image src={sprites.front_shiny} alt={name} width={100} height={100} />
                                <Image src={sprites.back_shiny} alt={name} width={100} height={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pokemonIds = [...Array(151)].map((_value, index) => `${index + 1}`);

    return {
        paths: pokemonIds.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const { data } = await pokeApi.get<Pokemon>(`pokemon/${id}`);

    return { props: { pokemon: data } }
}

export default PokemonPage;