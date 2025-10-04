import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PokemonAPIResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  abilities: any[];
  stats: any[];
  types: any[];
  sprites: any;
  moves: any[];
  species: any;
  forms: any[];
  game_indices: any[];
  held_items: any[];
  location_area_encounters: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, pokemonId } = await req.json();

    if (action === "sync-all") {
      const results = [];
      const errors = [];

      for (let i = 1; i <= 151; i++) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          
          if (!response.ok) {
            errors.push({ id: i, error: `API returned ${response.status}` });
            continue;
          }

          const pokemonData: PokemonAPIResponse = await response.json();

          const { data, error } = await supabase
            .from("pokemon_details")
            .upsert({
              id: pokemonData.id,
              name: pokemonData.name,
              height: pokemonData.height,
              weight: pokemonData.weight,
              base_experience: pokemonData.base_experience,
              order: pokemonData.order,
              is_default: pokemonData.is_default,
              abilities: pokemonData.abilities,
              stats: pokemonData.stats,
              types: pokemonData.types,
              sprites: pokemonData.sprites,
              moves: pokemonData.moves.slice(0, 20),
              species: pokemonData.species,
              forms: pokemonData.forms,
              game_indices: pokemonData.game_indices,
              held_items: pokemonData.held_items,
              location_area_encounters: pokemonData.location_area_encounters,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: "id"
            });

          if (error) {
            errors.push({ id: i, error: error.message });
          } else {
            results.push({ id: i, name: pokemonData.name, success: true });
          }

          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          errors.push({ id: i, error: err.message });
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          synced: results.length, 
          errors: errors.length,
          results,
          errorDetails: errors 
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (action === "sync-one" && pokemonId) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const pokemonData: PokemonAPIResponse = await response.json();

      const { data, error } = await supabase
        .from("pokemon_details")
        .upsert({
          id: pokemonData.id,
          name: pokemonData.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          base_experience: pokemonData.base_experience,
          order: pokemonData.order,
          is_default: pokemonData.is_default,
          abilities: pokemonData.abilities,
          stats: pokemonData.stats,
          types: pokemonData.types,
          sprites: pokemonData.sprites,
          moves: pokemonData.moves.slice(0, 20),
          species: pokemonData.species,
          forms: pokemonData.forms,
          game_indices: pokemonData.game_indices,
          held_items: pokemonData.held_items,
          location_area_encounters: pokemonData.location_area_encounters,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "id"
        });

      if (error) {
        throw error;
      }

      return new Response(
        JSON.stringify({ success: true, data }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use 'sync-all' or 'sync-one'" }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});