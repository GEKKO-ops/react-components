import {
  useEffect,
  useState,
  forwardRef,
  FC,
  ForwardedRef,
  ChangeEvent,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import { setCountries } from '../../stores/reducers/countrySlice';
import countries from '../../utils/constatnts';
interface CountryAutocompleteProps {
  country?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

const CountryAutocomplete: FC<
  CountryAutocompleteProps & { ref?: ForwardedRef<HTMLInputElement> }
> = forwardRef(({ country, onChange }, ref) => {
  const dispatch = useAppDispatch();
  const { countriesList } = useAppSelector((state) => state.countryReducer);

  useEffect(() => {
    dispatch(setCountries(countries));
  }, [dispatch]);

  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = countriesList.filter((country: string) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    country;
  };

  return (
    <div className="input-field">
      <label htmlFor="countryList">Country:</label>
      <input
        type="text"
        id="country"
        name="country"
        value={inputValue}
        onChange={(event) => {
          handleInputChange(event);
          if (onChange) {
            onChange(event);
          }
        }}
        list="countryList"
        ref={ref}
      />
      <datalist id="countryList">
        {filteredCountries.map((country) => (
          <option
            key={country}
            value={country}
          />
        ))}
      </datalist>
    </div>
  );
});

export default CountryAutocomplete;
