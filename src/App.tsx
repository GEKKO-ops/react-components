import { FC, useEffect, useState } from 'react';
import ResultCatalog from './components/result-catalog/ResultCatalog';
import Header from './components/header/Header';
import ErrorButton from './components/error-button/ErrorButton';
import ErrorBoundary from './components/error-boundary/ErrorBoundry';
import './app.css';

const App: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

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
        />
        <ResultCatalog queryParam={inputValue} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
