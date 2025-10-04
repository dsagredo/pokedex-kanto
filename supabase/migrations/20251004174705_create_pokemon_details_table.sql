/*
  # Create Pokemon Details Table

  1. New Tables
    - `pokemon_details`
      - `id` (integer, primary key) - Pokemon ID from API
      - `name` (text) - Pokemon name
      - `height` (integer) - Pokemon height in decimetres
      - `weight` (integer) - Pokemon weight in hectograms
      - `base_experience` (integer) - Base experience yield
      - `order` (integer) - Order for sorting
      - `is_default` (boolean) - Default variant
      - `abilities` (jsonb) - Array of abilities with details
      - `stats` (jsonb) - Array of stats (hp, attack, defense, etc.)
      - `types` (jsonb) - Array of types
      - `sprites` (jsonb) - Image URLs
      - `moves` (jsonb) - Array of moves
      - `species` (jsonb) - Species information
      - `forms` (jsonb) - Form variations
      - `game_indices` (jsonb) - Game version indices
      - `held_items` (jsonb) - Items the Pokemon can hold
      - `location_area_encounters` (text) - URL for location data
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `pokemon_details` table
    - Add policy for public read access (Pokemon data is public)
    - Add policy for authenticated users to insert/update (admin operations)
  
  3. Important Notes
    - Pokemon data is publicly accessible information
    - Read access is unrestricted for all users
    - Write access restricted to authenticated users
    - JSONB used for complex nested data structures
    - Includes comprehensive Pokemon information from PokeAPI
*/

CREATE TABLE IF NOT EXISTS pokemon_details (
  id integer PRIMARY KEY,
  name text NOT NULL,
  height integer DEFAULT 0,
  weight integer DEFAULT 0,
  base_experience integer DEFAULT 0,
  "order" integer DEFAULT 0,
  is_default boolean DEFAULT true,
  abilities jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  types jsonb DEFAULT '[]'::jsonb,
  sprites jsonb DEFAULT '{}'::jsonb,
  moves jsonb DEFAULT '[]'::jsonb,
  species jsonb DEFAULT '{}'::jsonb,
  forms jsonb DEFAULT '[]'::jsonb,
  game_indices jsonb DEFAULT '[]'::jsonb,
  held_items jsonb DEFAULT '[]'::jsonb,
  location_area_encounters text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pokemon_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read Pokemon data"
  ON pokemon_details
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert Pokemon data"
  ON pokemon_details
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update Pokemon data"
  ON pokemon_details
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_pokemon_details_name ON pokemon_details(name);
CREATE INDEX IF NOT EXISTS idx_pokemon_details_types ON pokemon_details USING gin(types);
CREATE INDEX IF NOT EXISTS idx_pokemon_details_abilities ON pokemon_details USING gin(abilities);