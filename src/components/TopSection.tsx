import { Component } from 'react';
import Input from './Input';
import Button from './Button';

interface ITopSectionState {
  inputValue: string;
  updateAppInputValue: (newValue: string) => void;
}

class TopSection extends Component<ITopSectionState> {
  state = {
    value: this.props.inputValue,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSearch = () => {
    const inputValue = this.state.value;
    if (inputValue) {
      localStorage.setItem('inputValue', inputValue);
      this.props.updateAppInputValue(inputValue);
    }
  };

  render() {
    return (
      <div>
        <Input
          value={this.state.value}
          changeHandler={this.handleInputChange}
        />
        <Button
          type="submit"
          disabled={false}
          value="Search"
          clickHandler={this.handleSearch}
        />
      </div>
    );
  }
}

export default TopSection;
