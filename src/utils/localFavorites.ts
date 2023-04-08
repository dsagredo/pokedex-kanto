const toggleFavorite = (id: number) => {
    let favorite: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorite.includes(id)) {
        favorite = favorite.filter((pokeId) => pokeId !== id);
    } else {
        favorite.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorite));
};

const existInFavorites = (id: number): boolean => {
    if (typeof window === 'undefined') return false;

    const favorite: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorite.includes(id);
};

const pokemonFavorites = (): number[] => JSON.parse(localStorage.getItem('favorites') || '[]');

export default { toggleFavorite, existInFavorites, pokemonFavorites };
