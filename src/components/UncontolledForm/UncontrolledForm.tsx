import { useRef, useState } from 'react';
import { IFormData } from '../../utils/types/types';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../stores/hooks/redux';
import { formDataSlice } from '../../stores/reducers/formDataSlice';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [base64Picture, setBase64Picture] = useState<string>('');
  const { updateFormData } = formDataSlice.actions;
  const navigate = useNavigate();

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64Picture(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    formData.append('accept', acceptTerms.toString());

    const formDataObject: IFormData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      accept: formData.get('accept') === 'true',
      country: selectedCountry,
      picture: base64Picture,
    };
    dispatch(updateFormData(formDataObject));
    navigate('/', { replace: true });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
      </div>

      <div>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
          />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
          />{' '}
          Female
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />{' '}
          Accept Terms & Conditions
        </label>
      </div>

      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          onChange={handleFileChange}
        />
      </div>
      <CountryAutocomplete onCountrySelect={handleCountrySelect} />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
