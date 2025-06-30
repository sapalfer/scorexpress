import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);
const STORAGE_KEY = 'scorexpress_favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (list: string[]) => {
    setFavorites(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {/*ignore*/}
  };

  const toggleFavorite = useCallback(
    (id: string) => {
      persist(favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id]);
    },
    [favorites]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const value: FavoritesContextValue = { favorites, isFavorite, toggleFavorite };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
