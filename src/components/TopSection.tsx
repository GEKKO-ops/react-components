import { Component } from 'react';
import Input from './Input';
import Button from './Button';

interface ITopSectionState {
  inputValue: string;
}

class TopSection extends Component<unknown, ITopSectionState> {
  constructor(props: unknown) {
    super(props);

    const storedValue = localStorage.getItem('inputValue');

    this.state = {
      inputValue: storedValue || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    localStorage.setItem('inputValue', inputValue);

    this.setState({
      inputValue,
    });
  };
  render() {
    return (
      <>
        <Input
          value={this.state.inputValue}
          changeHandler={this.handleInputChange}
        />
        <Button
          type="submit"
          disabled={false}
          value="Search"
        />
      </>
    );
  }
}

export default TopSection;
