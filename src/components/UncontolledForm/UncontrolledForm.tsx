import { useRef, useState } from 'react';
import { IFormData, IFormDataStored } from '../../utils/types/types';
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { updateFormData } = formDataSlice.actions;
  const navigate = useNavigate();
  let formDataObject: IFormData = {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    country: '',
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    formData.append('terms', acceptTerms.toString());

    formDataObject = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'true',
      country: formData.get('country') as string,
      picture: formData.getAll('picture') as File[],
    };

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
            console.log(finalData);
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
        />
        {formErrors.picture && <p>{formErrors.picture}</p>}
      </div>
      <div className="data country">
        <CountryAutocomplete country={formDataObject.country} />
        {formErrors.country && <p>{formErrors.country}</p>}
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
