import { useRef, useState } from 'react';
import { IFormDataStored } from '../../models/types';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../stores/hooks/redux';
import { updateFormData } from '../../stores/reducers/formDataSlice';
import { Link, useNavigate } from 'react-router-dom';
import { SCHEMA } from '../../utils/yup/schema';
import { ValidationError } from 'yup';

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileList(file ? [file] : []);
  };
  let countryForAutocomplete = '';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    formData.append('terms', acceptTerms.toString());

    const formDataObject = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'true',
      country: formData.get('country') as string,
      picture: fileList,
    };

    countryForAutocomplete = formDataObject.country;

    SCHEMA.validate(formDataObject, { abortEarly: false })
      .then(async () => {
        if (formDataObject.picture?.length) {
          const file = formDataObject.picture[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const finalData: IFormDataStored = {
              ...formDataObject,
              picture: reader.result as string,
            };
            dispatch(updateFormData(finalData));
          };
          if (file instanceof Blob) {
            reader.readAsDataURL(file);
          }
        } else {
          const finalData: IFormDataStored = {
            ...formDataObject,
            picture: ' ',
          };
          dispatch(updateFormData(finalData));
        }
        navigate('/', { replace: true });
      })
      .catch((validationErrors: ValidationError) => {
        const newErrors: Record<string, string> = {};
        if (validationErrors && validationErrors.inner) {
          validationErrors.inner.forEach((error) => {
            newErrors[error.path as string] = error.message;
          });
        }
        setFormErrors(newErrors);
      });
  };

  return (
    <>
      <Link
        className="main-link"
        to="/"
      >
        Main
      </Link>
      <h2>Uncontrolled form</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="input-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
          />
          <div className="error">
            {formErrors.name && <p>{formErrors.name}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
          />
          <div className="error">
            {formErrors.age && <p>{formErrors.age}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
          />
          <div className="error">
            {formErrors.email && <p>{formErrors.email}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
          />
          <div className="error">
            {formErrors.password && <p>{formErrors.password}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <div className="error">
            {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
          </div>
        </div>
        <div className="input-field gender">
          <label>Gender:</label>
          <label>Male</label>
          <input
            type="radio"
            name="gender"
            value="male"
          />
          <label>Female</label>
          <input
            type="radio"
            name="gender"
            value="female"
          />
        </div>
        <div className="error">
          {formErrors.gender && <p>{formErrors.gender}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            onChange={handleFileChange}
          />
          <div className="error">
            {formErrors.picture && <p>{formErrors.picture}</p>}
          </div>
        </div>
        <div className="input-field">
          <CountryAutocomplete country={countryForAutocomplete} />
        </div>
        <div className="error">
          {formErrors.country && <p>{formErrors.country}</p>}
        </div>
        <div className="input-field terms">
          <label>Accept Terms & Conditions</label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
          />
        </div>
        <div className="error">
          {formErrors.terms && <p>{formErrors.terms}</p>}
        </div>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default UncontrolledForm;
