import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import '../components.css';

interface HeaderState {
  inputValue: string;
  updateAppInputValue: (newValue: string) => void;
}

const Header: React.FC<HeaderState> = (props) => {
  const [value, setValue] = useState(props.inputValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length === 0) {
      setToLocalStorage(newValue);
    }
  };

  const handleSearch = () => {
    if (value) {
      setToLocalStorage(value);
    }
  };

  const setToLocalStorage = (value: string) => {
    localStorage.setItem('inputValue', value);
    props.updateAppInputValue(value);
  };

  return (
    <div className="section top-section">
      <Input
        value={value}
        changeHandler={handleInputChange}
      />
      <Button
        extraClass="search-button"
        type="submit"
        disabled={false}
        value="Search"
        clickHandler={handleSearch}
      />
    </div>
  );
};

export default Header;
