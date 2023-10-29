import { Component } from 'react';
import Input from './Input';
import Button from './Button';
import './components.css';

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
    localStorage.setItem('inputValue', inputValue);
    this.props.updateAppInputValue(inputValue);
  };

  render() {
    return (
      <div className="section top-section">
        <Input
          value={this.state.value}
          changeHandler={this.handleInputChange}
        />
        <Button
          extraClass="serch-button"
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
