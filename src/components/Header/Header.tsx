import { ChangeEvent, useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const savedValue = localStorage.getItem('inputValue');
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

  const handleSearch = () => {
    localStorage.setItem('inputValue', value);
    if (value) {
      router.push(
        {
          pathname: `/search/page/[page]`,
          query: { 'search.name': value },
        },
        `/search/page/1?search.name=${value}`
      );
    } else {
      localStorage.removeItem('inputValue');
      router.push(
        {
          pathname: `/search/page/[page]`,
        },
        `/search/page/1`
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <header className="header">
      <input
        value={value}
        placeholder="Enter your search term"
        data-testid="search-input"
        onChange={handleChange}
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
