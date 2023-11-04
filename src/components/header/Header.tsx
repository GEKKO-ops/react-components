import { useEffect, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import '../components.css';
import { useNavigate } from 'react-router-dom';

interface HeaderState {
  inputValue: string;
  updateAppInputValue: (newValue: string) => void;
  handleStartSearch: () => void;
  handleStopSearch: () => void;
}

const Header: React.FC<HeaderState> = (props) => {
  const [value, setValue] = useState(props.inputValue);
  const navigate = useNavigate();

  useEffect(() => {
    setValue(props.inputValue);
  }, [props.inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length === 0) {
      setToLocalStorage(newValue);
    }
    navigate('/search/page/1');
  };

  const handleSearch = () => {
    if (value) {
      setToLocalStorage(value);
    }
    navigate('/search/page/1');
  };

  const setToLocalStorage = (value: string) => {
    localStorage.setItem('inputValue', value);
    props.updateAppInputValue(value);
  };

  return (
    <div className="section top-section">
      <Input
        value={value}
        changeHandler={(e) => {
          handleInputChange(e);
          props.handleStopSearch();
        }}
      />
      <Button
        extraClass="search-button"
        type="submit"
        disabled={false}
        value="Search"
        clickHandler={() => {
          handleSearch();
          props.handleStartSearch();
        }}
      />
    </div>
  );
};

export default Header;
