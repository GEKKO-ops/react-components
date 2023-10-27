import { Component } from 'react';
import TopSection from './components/TopSection';
import BottomSection from './components/BottomSection';
interface IApp {
  inputValue: string;
}

class App extends Component<object, IApp> {
  constructor(props: object) {
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
      <>
        <TopSection
          inputValue={inputValue}
          updateAppInputValue={this.updateInputValue}
        />
        <BottomSection queryParam={inputValue} />
      </>
    );
  }
}

export default App;
