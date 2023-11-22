import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { searchSlice } from '../../stores/reducers/SearchSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import CustomInput from '../CustomInput/CustomInput';
import '../components.css';

interface HeaderState {
  handleStartSearch: () => void;
  handleStopSearch: () => void;
}

const CustomHeader: React.FC<HeaderState> = (props) => {
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
    <header className="header">
      <CustomInput
        value={inputValue!}
        placeholder="Enter your search term"
        data-testid="search-input"
        changeHandler={(event) => {
          handleInputChange(event);
          props.handleStopSearch();
        }}
      />
      <CustomButton
        extraClass="search-button"
        type="submit"
        disabled={false}
        value="Search"
        clickHandler={() => {
          handleSearch();
          props.handleStartSearch();
        }}
      />
    </header>
  );
};

export default CustomHeader;
