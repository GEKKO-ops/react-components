import { FC, useState } from 'react';
import ResultCatalog from '../components/result-catalog/ResultCatalog';
import Header from '../components/header/Header';

export const MainPage: FC = () => {
  const [startPage, setStartPage] = useState(false);

  const startSearch = () => {
    setStartPage(true);
  };

  const stopSearch = () => {
    setStartPage(false);
  };

  return (
    <div className="main-wrap">
      <Header
        handleStartSearch={startSearch}
        handleStopSearch={stopSearch}
      />
      <ResultCatalog
        startPage={startPage}
        handleStopSearch={stopSearch}
      />
    </div>
  );
};
