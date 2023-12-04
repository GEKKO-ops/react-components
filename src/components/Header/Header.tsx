import { ChangeEvent, useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
import { setStoredSearchValue } from '../../stores/reducers/SearchSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import CustomInput from '../CustomInput/CustomInput';
import '../components.css';

const Header: React.FC = () => {
  const { storedSearchValue } = useAppSelector((state) => state.searchReducer);
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (storedSearchValue) {
      setValue(storedSearchValue);
    }
  }, [storedSearchValue]);

  const handleSearch = () => {
    localStorage.setItem('inputValue', value);
    if (value) {
      navigate('/search/page/1', { replace: true });
      dispatch(setStoredSearchValue(value));
    } else {
      localStorage.removeItem('inputValue');
      navigate('/search/page/1', { replace: true });
      dispatch(setStoredSearchValue(value));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <header className="header">
      <CustomInput
        value={value}
        placeholder="Enter your search term"
        data-testid="search-input"
        changeHandler={handleChange}
      />
      <CustomButton
        extraClass="search-button"
        type="submit"
        disabled={false}
        value="Search"
        clickHandler={handleSearch}
      />
    </header>
  );
};

export default Header;
