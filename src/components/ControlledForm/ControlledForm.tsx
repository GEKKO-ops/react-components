import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import { useAppDispatch } from '../../stores/hooks/redux';
import { formDataSlice } from '../../stores/reducers/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { SCHEMA } from '../../utils/types/yup/shema';
import { IControledFormData, IFormDataStored } from '../../utils/types/types';
// import { useState } from 'react';

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
    defaultValues: {
      terms: false,
    },
  });
  console.log(getValues('country'), getValues('email'));

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="data name">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name')}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="data age">
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          {...register('age')}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div className="data email">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          {...register('email')}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="data password">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="data password">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div className="data gender">
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            {...register('gender')}
            value="male"
          />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            {...register('gender')}
            value="female"
          />{' '}
          Female
        </label>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div className="data terms">
        <label>
          <input
            type="checkbox"
            {...register('terms')}
          />{' '}
          Accept Terms & Conditions
        </label>
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>
      <div className="data pictire">
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          {...register('picture')}
        />
        {errors.picture && <p>{errors.picture.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <CountryAutocomplete
          // country={getValues('country')}
          {...register('country')}
        />
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ControlledForm;
