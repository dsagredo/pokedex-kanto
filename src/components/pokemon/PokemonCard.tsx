import { FC } from 'react';
import { SmallPokemon } from '@/interfaces';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router = useRouter();
    const onClick = () => router.push(`/name/${pokemon.name}`);
    return (
        <Card className="cursor-pointer hover:shadow-xl transition-shadow" onClick={onClick}>
            <CardHeader>
                <img src={pokemon.img} alt={pokemon.name} className="w-full h-36 object-contain" />
            </CardHeader>

            <CardBody className="p-2">
                <h2 className="capitalize text-gray-900 dark:text-white font-medium">
                    {pokemon.name}
                </h2>
            </CardBody>

            <CardFooter className="flex justify-between p-2 bg-gray-100 dark:bg-gray-900">
                {/* Aquí puedes agregar botones, stats, etc. */}
                <span>ID: {pokemon.id}</span>
            </CardFooter>
        </Card>
    );
};

export default PokemonCard;
