import { Card, CardBody, CardFooter } from '@heroui/card';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { FC } from 'react';
import { SmallPokemon } from '@/interfaces';

interface Props {
    pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router = useRouter();

    return (
        <Card isPressable isHoverable onClick={() => router.push(`/name/${pokemon.name}`)}>
            <CardBody>
                <Image
                    src={pokemon.img}
                    alt={pokemon.name}
                    width={256}
                    height={144}
                    className="w-full h-36 object-contain"
                    priority
                />
            </CardBody>
            <CardFooter>
                <div className="flex justify-between">
                    <span className="capitalize">{pokemon.name}</span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PokemonCard;
