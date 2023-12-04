import { FC } from 'react';
import ResultCatalog from '../../components/result-catalog/ResultCatalog';
import Header from '../../components/Header/Header';

export const MainPage: FC = () => {
  return (
    <div className="main-wrap">
      <Header />
      <ResultCatalog />
    </div>
  );
};
