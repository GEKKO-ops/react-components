import { useRef } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useRouter } from 'next/router';

const CustomHeader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const page = router.query.page || '1';

  const handleSearch = () => {
    localStorage.setItem('inputValue', inputRef.current?.value || '');
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      router.push(
        {
          pathname: '/search/page/[page]',
          query: { 'search.name': inputValue },
        },
        `/search/page/${page}?search.name=${inputValue}`
      );
    }
  };

  const handleClearSearch = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('inputValue');
    }
    inputRef.current!.value = '';
    router.push(
      {
        pathname: '/search/page/[page]',
      },
      `/search/page/${page}`
    );
  };
  const handleChange = () => {
    if (inputRef.current && inputRef.current.value.length === 0) {
      handleClearSearch();
    }
  };

  return (
    <header className="header">
      <input
        ref={inputRef}
        defaultValue={
          typeof window !== 'undefined'
            ? localStorage.getItem('inputValue') || ''
            : ''
        }
        placeholder="Enter your search term"
        data-testid="search-input"
        onChange={() => {
          handleChange();
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
