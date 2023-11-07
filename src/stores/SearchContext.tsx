import { ReactNode, createContext, useContext, useState } from 'react';

interface ContextValue {
  localStorageValue: string;
  setLocalStorageValue: (value: string) => void;
}

const SearchContext = createContext<ContextValue | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    const storedValue = localStorage.getItem('inputValue');
    return storedValue || '';
  });

  return (
    <SearchContext.Provider value={{ localStorageValue, setLocalStorageValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
