import { ReactNode, createContext, useContext, useState } from 'react';
import { ApiData } from '../utils/types/types';
import { searchApiResults } from '../utils/constants';

interface FetchDataContextValue {
  apiData: ApiData;
  setFetchData: (data: ApiData) => void;
}

const FetchDataContext = createContext<FetchDataContextValue | undefined>(
  undefined
);

export const FetchDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [apiData, setFetchData] = useState<ApiData>(searchApiResults);

  return (
    <FetchDataContext.Provider value={{ apiData, setFetchData }}>
      {children}
    </FetchDataContext.Provider>
  );
};

export const useFetchDataContext = () => {
  const context = useContext(FetchDataContext);
  if (context === undefined) {
    throw new Error(
      'useFetchDataContext must be used within a FetchDataProvider'
    );
  }
  return context;
};
