export interface PokemonListResponse {
    count: number;
    next: string;
    previous?: string;
    results: SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url: string;
    id: number;
    img: string;
    weight?: number;
    height?: number;
    stats?: Array<{
        base_stat: number;
        stat: {
            name: string;
        };
    }>;
}
