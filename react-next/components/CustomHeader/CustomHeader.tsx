// import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
// import { useNavigate } from 'react-router-dom';
// import { searchSlice } from '../../stores/reducers/SearchSlice';
// import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
// import CustomInput from '../CustomInput/CustomInput';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const CustomHeader: React.FC = () => {
  // const { storedSearchValue } = useAppSelector((state) => state.searchReducer);
  // const [inputValue, setInputValue] = useState(storedSearchValue || '');
  // const navigate = useNavigate();
  // const { setStoredSearchValue } = searchSlice.actions;
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (storedSearchValue) {
  //     setInputValue(storedSearchValue);
  //   }
  // }, [storedSearchValue]);

  // const setToLocalStorage = (value: string) => {
  //   localStorage.setItem('inputValue', value);
  //   dispatch(setStoredSearchValue(value));
  //   navigate('/search/page/1', { replace: true });
  // };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue) {
      params.set('query', newValue);
    } else {
      params.delete('query');
    }
  };

  const handleSearch = () => {
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="header">
      <input
        defaultValue={searchParams.get('query')?.toString()}
        placeholder="Enter your search term"
        data-testid="search-input"
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <CustomButton
        extraClass="search-button"
        type="submit"
        disabled={false}
        value="Search"
        clickHandler={() => {
          handleSearch();
        }}
      />
    </header>
  );
};

export default CustomHeader;
