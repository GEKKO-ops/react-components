import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { ApiData } from '../utils/types/types';
import { searchApiResults } from '../utils/constants';

interface ContextValue {
  localStorageValue: string;
  apiData: ApiData;
  setFetchData: (data: ApiData) => void;
  setLocalStorageValue: (value: string) => void;
}

const AppContext = createContext<ContextValue | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    const storedValue = localStorage.getItem('inputValue');
    return storedValue || '';
  });
  const [apiData, setFetchData] = useState<ApiData>(searchApiResults);

  return (
    <AppContext.Provider
      value={{ localStorageValue, apiData, setFetchData, setLocalStorageValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
