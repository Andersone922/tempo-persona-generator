
import { Identity } from './identity-generator';

const FAVORITES_KEY = 'identity-generator-favorites';
const HISTORY_KEY = 'identity-generator-history';

// Favorites
export const getFavorites = (): Identity[] => {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const addToFavorites = (identity: Identity): void => {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === identity.id)) {
    favorites.push(identity);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (identityId: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(identity => identity.id !== identityId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const isFavorite = (identityId: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === identityId);
};

// History
export const getHistory = (): Identity[] => {
  const historyJson = localStorage.getItem(HISTORY_KEY);
  return historyJson ? JSON.parse(historyJson) : [];
};

export const addToHistory = (identity: Identity): void => {
  const history = getHistory();
  const updatedHistory = [identity, ...history.filter(item => item.id !== identity.id)].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const clearHistory = (): void => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
};
