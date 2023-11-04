import { FC, useState } from 'react';
import ResultCatalog from './components/result-catalog/ResultCatalog';
import Header from './components/header/Header';
import ErrorButton from './components/error-button/ErrorButton';
import ErrorBoundary from './components/error-boundary/ErrorBoundry';
import './app.css';

const App: FC = () => {
  const [inputValue, setInputValue] = useState<string>(() => {
    const storedValue = localStorage.getItem('inputValue');
    return storedValue || '';
  });
  const [startPage, setStartPage] = useState(false);
  console.log(startPage);

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
    <div className="wrap">
      <h1 className="main-title"> Rick and Morty API</h1>
      <ErrorBoundary>
        <ErrorButton />
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
      </ErrorBoundary>
    </div>
  );
};

export default App;
