import { FC } from "react"
import { SmallPokemon } from "@/interfaces";
import { Grid, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
    pokemon: SmallPokemon
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router = useRouter();
    const onClick = () => router.push(`/pokemon/${pokemon.id}`);
    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
            <Card isPressable isHoverable onClick={() => onClick()}>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={pokemon.img}
                        width="100%"
                        height={140}
                        alt={pokemon.name}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify="space-between">
                        <Text transform="capitalize">
                            {pokemon.name}
                        </Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}

export default PokemonCard