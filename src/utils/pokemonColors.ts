export interface PokemonTypeColors {
    from: string;
    via: string;
    to: string;
    border: string;
    glow: string;
    text: string;
}

export const typeColors: Record<string, PokemonTypeColors> = {
    normal: {
        from: 'from-slate-700',
        via: 'via-slate-600',
        to: 'to-slate-500',
        border: 'border-slate-400/30',
        glow: 'rgba(148, 163, 184, 0.6)',
        text: 'from-slate-300 via-slate-200 to-slate-100',
    },
    fire: {
        from: 'from-red-700',
        via: 'via-orange-600',
        to: 'to-yellow-500',
        border: 'border-orange-400/30',
        glow: 'rgba(251, 146, 60, 0.6)',
        text: 'from-orange-300 via-yellow-300 to-red-300',
    },
    water: {
        from: 'from-blue-700',
        via: 'via-blue-600',
        to: 'to-cyan-500',
        border: 'border-blue-400/30',
        glow: 'rgba(59, 130, 246, 0.6)',
        text: 'from-blue-300 via-cyan-300 to-blue-200',
    },
    electric: {
        from: 'from-yellow-600',
        via: 'via-yellow-500',
        to: 'to-amber-400',
        border: 'border-yellow-400/30',
        glow: 'rgba(234, 179, 8, 0.6)',
        text: 'from-yellow-300 via-amber-300 to-yellow-200',
    },
    grass: {
        from: 'from-green-700',
        via: 'via-green-600',
        to: 'to-emerald-500',
        border: 'border-green-400/30',
        glow: 'rgba(34, 197, 94, 0.6)',
        text: 'from-green-300 via-emerald-300 to-green-200',
    },
    ice: {
        from: 'from-cyan-600',
        via: 'via-cyan-500',
        to: 'to-teal-400',
        border: 'border-cyan-400/30',
        glow: 'rgba(6, 182, 212, 0.6)',
        text: 'from-cyan-300 via-teal-300 to-cyan-200',
    },
    fighting: {
        from: 'from-red-800',
        via: 'via-red-700',
        to: 'to-orange-600',
        border: 'border-red-500/30',
        glow: 'rgba(239, 68, 68, 0.6)',
        text: 'from-red-300 via-orange-300 to-red-200',
    },
    poison: {
        from: 'from-purple-700',
        via: 'via-purple-600',
        to: 'to-fuchsia-500',
        border: 'border-purple-400/30',
        glow: 'rgba(168, 85, 247, 0.6)',
        text: 'from-purple-300 via-fuchsia-300 to-purple-200',
    },
    ground: {
        from: 'from-amber-700',
        via: 'via-yellow-700',
        to: 'to-orange-600',
        border: 'border-amber-500/30',
        glow: 'rgba(217, 119, 6, 0.6)',
        text: 'from-amber-300 via-yellow-300 to-orange-300',
    },
    flying: {
        from: 'from-sky-600',
        via: 'via-indigo-500',
        to: 'to-blue-400',
        border: 'border-sky-400/30',
        glow: 'rgba(14, 165, 233, 0.6)',
        text: 'from-sky-300 via-blue-300 to-indigo-300',
    },
    psychic: {
        from: 'from-pink-700',
        via: 'via-pink-600',
        to: 'to-rose-500',
        border: 'border-pink-400/30',
        glow: 'rgba(236, 72, 153, 0.6)',
        text: 'from-pink-300 via-rose-300 to-pink-200',
    },
    bug: {
        from: 'from-lime-700',
        via: 'via-lime-600',
        to: 'to-green-500',
        border: 'border-lime-400/30',
        glow: 'rgba(132, 204, 22, 0.6)',
        text: 'from-lime-300 via-green-300 to-lime-200',
    },
    rock: {
        from: 'from-stone-700',
        via: 'via-stone-600',
        to: 'to-amber-600',
        border: 'border-stone-400/30',
        glow: 'rgba(120, 113, 108, 0.6)',
        text: 'from-stone-300 via-amber-300 to-stone-200',
    },
    ghost: {
        from: 'from-violet-800',
        via: 'via-purple-700',
        to: 'to-indigo-600',
        border: 'border-violet-400/30',
        glow: 'rgba(139, 92, 246, 0.6)',
        text: 'from-violet-300 via-purple-300 to-indigo-300',
    },
    dragon: {
        from: 'from-indigo-800',
        via: 'via-violet-700',
        to: 'to-purple-600',
        border: 'border-indigo-400/30',
        glow: 'rgba(99, 102, 241, 0.6)',
        text: 'from-indigo-300 via-violet-300 to-purple-300',
    },
    dark: {
        from: 'from-neutral-800',
        via: 'via-stone-800',
        to: 'to-neutral-700',
        border: 'border-neutral-500/30',
        glow: 'rgba(82, 82, 91, 0.6)',
        text: 'from-neutral-300 via-stone-300 to-neutral-200',
    },
    steel: {
        from: 'from-gray-600',
        via: 'via-slate-600',
        to: 'to-zinc-500',
        border: 'border-gray-400/30',
        glow: 'rgba(148, 163, 184, 0.6)',
        text: 'from-gray-300 via-slate-300 to-zinc-300',
    },
    fairy: {
        from: 'from-pink-600',
        via: 'via-pink-500',
        to: 'to-rose-400',
        border: 'border-pink-400/30',
        glow: 'rgba(244, 114, 182, 0.6)',
        text: 'from-pink-300 via-rose-300 to-pink-200',
    },
};

export const getPokemonTypeColors = (types?: { type: { name: string } }[]): PokemonTypeColors => {
    if (!types || types.length === 0) {
        return typeColors.normal;
    }

    const primaryType = types[0].type.name;
    return typeColors[primaryType] || typeColors.normal;
};
