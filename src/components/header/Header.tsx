import { Component } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import '../components.css';

interface HeaderState {
  inputValue: string;
  updateAppInputValue: (newValue: string) => void;
}

class Header extends Component<HeaderState> {
  state = {
    value: this.props.inputValue,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        if (this.state.value.length === 0) {
          this.setToLocalStorage(this.state.value);
        }
      }
    );
  };

  handleSearch = () => {
    const inputValue = this.state.value;
    if (inputValue) {
      this.setToLocalStorage(inputValue);
    }
  };

  setToLocalStorage = (value: string) => {
    localStorage.setItem('inputValue', value);
    this.props.updateAppInputValue(value);
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

export default Header;
