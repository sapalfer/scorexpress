import React, { createContext, useState, ReactNode } from 'react';

export interface AppContextProps {
  currentScoreId: string | null;
  setCurrentScoreId: (id: string | null) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentScoreId, setCurrentScoreId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ 
      currentScoreId, 
      setCurrentScoreId,
      isMenuOpen,
      setIsMenuOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};