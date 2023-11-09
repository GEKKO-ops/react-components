import { useEffect, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../stores/SearchContext';
import '../components.css';

interface HeaderState {
  handleStartSearch: () => void;
  handleStopSearch: () => void;
}

const Header: React.FC<HeaderState> = (props) => {
  const { localStorageValue, setLocalStorageValue } = useAppContext();
  const [value, setValue] = useState(localStorageValue);
  const navigate = useNavigate();

  useEffect(() => {
    setValue(localStorageValue);
  }, [localStorageValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length === 0) {
      setToLocalStorage(newValue);
      navigate('/search/page/1', { replace: true });
    }
  };

  const handleSearch = () => {
    if (value) {
      setToLocalStorage(value);
    }
    navigate('/search/page/1', { replace: true });
  };

  const setToLocalStorage = (value: string) => {
    localStorage.setItem('inputValue', value);
    setLocalStorageValue(value);
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
