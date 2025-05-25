import { useContext } from 'react';
import { AppContext, AppContextProps } from '../context/AppContext';

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; // Make sure this closing brace is present