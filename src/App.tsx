import { Component } from 'react';
import ResultCatalog from './components/result-catalog/ResultCatalog';
import Header from './components/header/Header';
import ErrorButton from './components/error-button/ErrorButton';
import ErrorBoundary from './components/error-boundary/ErrorBoundry';
import './app.css';

interface IApp {
  inputValue: string;
}

class App extends Component<unknown, IApp> {
  constructor(props: unknown) {
    super(props);
    const storedValue = localStorage.getItem('inputValue');
    this.state = {
      inputValue: storedValue || '',
    };
  }

  updateInputValue = (newInputValue: string) => {
    this.setState({ inputValue: newInputValue });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div className="wrap">
        <h1 className="main-title"> Rick and Morty API</h1>
        <ErrorBoundary>
          <ErrorButton />
          <Header
            inputValue={inputValue}
            updateAppInputValue={this.updateInputValue}
          />
          <ResultCatalog queryParam={inputValue} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
