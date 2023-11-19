import { useEffect, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { searchSlice } from '../../stores/reducers/SearchSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import '../components.css';

interface HeaderState {
  handleStartSearch: () => void;
  handleStopSearch: () => void;
}

const Header: React.FC<HeaderState> = (props) => {
  const { storedSearchValue } = useAppSelector((state) => state.searchReducer);
  const [inputValue, setInputValue] = useState(storedSearchValue || '');
  const navigate = useNavigate();
  const { setStoredSearchValue } = searchSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storedSearchValue) {
      setInputValue(storedSearchValue);
    }
  }, [storedSearchValue]);

  const setToLocalStorage = (value: string) => {
    localStorage.setItem('inputValue', value);
    dispatch(setStoredSearchValue(value));
    navigate('/search/page/1', { replace: true });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (newValue.length === 0) {
      setToLocalStorage(newValue);
    }
  };

  const handleSearch = () => {
    setToLocalStorage(inputValue!);
  };

  return (
    <div className="section top-section">
      <Input
        value={inputValue!}
        placeholder="Enter your search term"
        data-testid="search-input"
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
