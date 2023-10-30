import { Component } from 'react';
import TopSection from './components/TopSection';
import BottomSection from './components/BottomSection';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundry';
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
          <TopSection
            inputValue={inputValue}
            updateAppInputValue={this.updateInputValue}
          />
          <BottomSection queryParam={inputValue} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
