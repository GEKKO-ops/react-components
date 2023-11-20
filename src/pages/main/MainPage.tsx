import { FC, useState } from 'react';
import ResultCatalog from '../../components/result-catalog/ResultCatalog';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

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
      <CustomHeader
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
