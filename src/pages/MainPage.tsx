import { FC, useState } from 'react';
import ResultCatalog from '../components/result-catalog/ResultCatalog';
import Header from '../components/header/Header';

export const MainPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>(() => {
    const storedValue = localStorage.getItem('inputValue');
    return storedValue || '';
  });
  const [startPage, setStartPage] = useState(false);

  const startSearch = () => {
    setStartPage(true);
  };

  const stopSearch = () => {
    setStartPage(false);
  };

  const updateInputValue = (newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <div className="main-wrap">
      <Header
        inputValue={inputValue}
        updateAppInputValue={updateInputValue}
        handleStartSearch={startSearch}
        handleStopSearch={stopSearch}
      />
      <ResultCatalog
        queryParam={inputValue}
        startPage={startPage}
        handleStopSearch={stopSearch}
      />
    </div>
  );
};
