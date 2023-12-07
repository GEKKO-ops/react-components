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
    const countries = [
      'Afghanistan',
      'Albania',
      'Algeria',
      'American Samoa',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua and Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bangladesh',
      'Barbados',
      'Bahamas',
      'Bahrain',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia and Herzegovina',
      'Botswana',
      'Brazil',
      'British Indian Ocean Territory',
      'British Virgin Islands',
      'Brunei Darussalam',
      'Bulgaria',
      'Burkina Faso',
      'Burma',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Cape Verde',
      'Cayman Islands',
      'Central African Republic',
      'Chad',
      'Chile',
      'China',
      'Christmas Island',
      'Cocos (Keeling) Islands',
      'Colombia',
      'Comoros',
      'Congo-Brazzaville',
      'Congo-Kinshasa',
      'Cook Islands',
      'Costa Rica',
      'Croatia',
      'Cura?ao',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'East Timor',
      'Ecuador',
      'El Salvador',
      'Egypt',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Ethiopia',
      'Falkland Islands',
      'Faroe Islands',
      'Federated States of Micronesia',
      'Fiji',
      'Finland',
      'France',
      'French Guiana',
      'French Polynesia',
      'French Southern Lands',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guadeloupe',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea-Bissau',
      'Guyana',
      'Haiti',
      'Heard and McDonald Islands',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iraq',
      'Ireland',
      'Isle of Man',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Kuwait',
      'Kyrgyzstan',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macau',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Martinique',
      'Mauritania',
      'Mauritius',
      'Mayotte',
      'Mexico',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'New Caledonia',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Niue',
      'Norfolk Island',
      'Northern Mariana Islands',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Pitcairn Islands',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'R?union',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Barth?lemy',
      'Saint Helena',
      'Saint Kitts and Nevis',
      'Saint Lucia',
      'Saint Martin',
      'Saint Pierre and Miquelon',
      'Saint Vincent',
      'Samoa',
      'San Marino',
      'S?o Tom? and Pr?ncipe',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Sint Maarten',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'South Africa',
      'South Georgia',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'Sudan',
      'Suriname',
      'Svalbard and Jan Mayen',
      'Sweden',
      'Swaziland',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Togo',
      'Tokelau',
      'Tonga',
      'Trinidad and Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks and Caicos Islands',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Vatican City',
      'Vietnam',
      'Venezuela',
      'Wallis and Futuna',
      'Western Sahara',
      'Yemen',
      'Zambia',
      'Zimbabwe',
    ];
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
