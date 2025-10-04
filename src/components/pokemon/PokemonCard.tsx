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
        <Card
            isPressable
            isHoverable
            onClick={() => router.push(`/name/${pokemon.name}`)}
            className="card-hover bg-white/80 backdrop-blur-sm border border-slate-200 shadow-md hover:shadow-2xl hover:border-blue-300"
        >
            <CardBody className="p-4">
                <div className="relative w-full aspect-square bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 mb-2">
                    <Image
                        src={pokemon.img}
                        alt={pokemon.name}
                        width={256}
                        height={256}
                        className="w-full h-full object-contain drop-shadow-lg"
                        priority
                    />
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200">
                    <span className="text-xs font-bold text-slate-600">#{String(pokemon.id).padStart(3, '0')}</span>
                </div>
            </CardBody>
            <CardFooter className="pt-0 pb-4 px-4">
                <div className="w-full">
                    <h3 className="text-lg font-bold capitalize text-slate-800 text-center">
                        {pokemon.name}
                    </h3>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PokemonCard;
