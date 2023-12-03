import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../stores/hooks/redux';
import { formDataSlice } from '../../stores/reducers/formDataSlice';
import { Link, useNavigate } from 'react-router-dom';
import { SCHEMA } from '../../utils/types/yup/shema';
import { IControledFormData, IFormDataStored } from '../../utils/types/types';

const ControlledForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updateFormData } = formDataSlice.actions;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SCHEMA),
    mode: 'onChange',
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<IControledFormData> = (data) => {
    const picture = data.picture as FileList;
    if (picture && picture.length) {
      const file = picture[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const finalData: IFormDataStored = {
          ...data,
          picture: reader.result as string,
        };
        dispatch(updateFormData(finalData));
      };
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
    } else {
      const finalData: IFormDataStored = {
        ...data,
        picture: '',
      };
      dispatch(updateFormData(finalData));
    }
    navigate('/', { replace: true });
  };

  return (
    <>
      <Link
        className="main-link"
        to="/"
      >
        Main
      </Link>
      <h2>React hook form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name')}
          />
          <div className="error">
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            {...register('age')}
          />
          <div className="error">
            {errors.age && <p>{errors.age.message}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register('email')}
          />
          <div className="error">
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          <div className="error">
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          <div className="error">
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <div className="input-field gender">
          <label>Gender:</label>
          <label> Male</label>
          <input
            type="radio"
            {...register('gender')}
            value="male"
          />
          <label>Female</label>
          <input
            type="radio"
            {...register('gender')}
            value="female"
          />
        </div>
        <div className="error">
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            {...register('picture')}
          />
          <div className="error">
            {errors.picture && <p>{errors.picture.message}</p>}
          </div>
        </div>
        <div>
          <CountryAutocomplete
            country={getValues('country')}
            {...register('country')}
          />
          <div className="error">
            {errors.country && <p>{errors.country.message}</p>}
          </div>
        </div>
        <div className="input-field terms">
          <label>Accept Terms & Conditions</label>
          <input
            type="checkbox"
            {...register('terms')}
          />
        </div>
        <div className="error">
          {errors.terms && <p>{errors.terms.message}</p>}
        </div>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default ControlledForm;
