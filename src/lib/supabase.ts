import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    order: number;
    is_default: boolean;
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }>;
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
    sprites: any;
    moves: any[];
    species: any;
    forms: any[];
    game_indices: any[];
    held_items: any[];
    location_area_encounters: string;
    created_at: string;
    updated_at: string;
}

export async function getPokemonDetails(idOrName: string | number): Promise<PokemonDetails | null> {
    const { data, error } = await supabase
        .from('pokemon_details')
        .select('*')
        .or(`id.eq.${idOrName},name.eq.${idOrName}`)
        .maybeSingle();

    if (error) {
        console.error('Error fetching Pokemon details:', error);
        return null;
    }

    return data;
}

export async function getAllPokemonDetails(): Promise<PokemonDetails[]> {
    const { data, error } = await supabase.from('pokemon_details').select('*').order('id', { ascending: true });

    if (error) {
        console.error('Error fetching all Pokemon details:', error);
        return [];
    }

    return data || [];
}
