import { useRef, useState } from 'react';
import { IFormData } from '../../utils/types/types';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../stores/hooks/redux';
import { formDataSlice } from '../../stores/reducers/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { SCHEMA } from '../../utils/types/yup/shema';
import { ValidationError } from 'yup';

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [base64Picture, setBase64Picture] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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
      terms: formData.get('accept') === 'true',
      country: selectedCountry,
      picture: base64Picture,
    };

    SCHEMA.validate(formDataObject, { abortEarly: false })
      .then(() => {
        dispatch(updateFormData(formDataObject));
        navigate('/', { replace: true });
        console.log(formDataObject);
      })
      .catch((validationErrors: ValidationError) => {
        const newErrors: Record<string, string> = {};
        console.log(validationErrors);
        if (validationErrors && validationErrors.inner) {
          validationErrors.inner.forEach((error) => {
            newErrors[error.path as string] = error.message;
          });
        }
        setFormErrors(newErrors);
      });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="data name">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
        />
        {formErrors.name && <p>{formErrors.name}</p>}
      </div>

      <div className="data age">
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
        />
        {formErrors.age && <p>{formErrors.age}</p>}
      </div>

      <div className="data email">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
        />
        {formErrors.email && <p>{formErrors.email}</p>}
      </div>

      <div className="data password">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
        />
        {formErrors.password && <p>{formErrors.password}</p>}
      </div>

      <div className="data password">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
      </div>

      <div className="data gender">
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
        {formErrors.gender && <p>{formErrors.gender}</p>}
      </div>
      <div className="data terms">
        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />{' '}
          Accept Terms & Conditions
        </label>
        {formErrors.terms && <p>{formErrors.terms}</p>}
      </div>

      <div className="data pictire">
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          onChange={handleFileChange}
        />
        {formErrors.picture && <p>{formErrors.picture}</p>}
      </div>
      <div className="data country">
        <CountryAutocomplete onCountrySelect={handleCountrySelect} />
        {formErrors.country && <p>{formErrors.country}</p>}
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
