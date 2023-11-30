import { useRef, useState } from 'react';
import { IFormData } from '../../utils/types/types';
// import { useDispatch } from 'react-redux';
// import { uploadPicture } from '../redux/actions/pictureActions';

const UncontrolledForm = () => {
  // const dispatch = useDispatch();
  // const pictureInputRef = useRef();
  const formRef = useRef<HTMLFormElement>(null);
  // const setRef = (node: HTMLFormElement) => {
  //   formRef = node;
  // };
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    // Добавляем acceptTerms вручную
    formData.append('accept', acceptTerms.toString());

    // Преобразуем FormData в объект IFormData
    const formDataObject: IFormData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      accept: formData.get('accept') === 'true', // Преобразуем строку в булево значение
    };

    console.log(formDataObject);

    // Access form fields using ref
    // const name = event.target.name.value;
    // const age = event.target.age.value;
    // const email = event.target.email.value;
    // const password1 = event.target.password1.value;
    // const password2 = event.target.password2.value;
    // const gender = event.target.gender.value;
    // const acceptTerms = event.target.acceptTerms.checked;

    // // Validate data (simplified for illustration)
    // if (!/^[A-Z]/.test(name)) {
    //   alert('Name must start with an uppercase letter.');
    //   return;
    // }

    // if (isNaN(age) || age < 0) {
    //   alert('Age must be a non-negative number.');
    //   return;
    // }

    // // Add more email validation logic as needed
    // if (!email.includes('@')) {
    //   alert('Invalid email address.');
    //   return;
    // }

    // if (password1 !== password2) {
    //   alert('Passwords do not match.');
    //   return;
    // }

    // if (!/\d/.test(password1) || !/[A-Z]/.test(password1) || !/[a-z]/.test(password1) || !/[!@#$%^&*]/.test(password1)) {
    //   alert('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.');
    //   return;
    // }

    // // Accessing the file input and validating the picture
    // const pictureFile = pictureInputRef.current?.files[0];
    // if (!pictureFile || pictureFile.size > 1024 * 1024 || !['image/png', 'image/jpeg'].includes(pictureFile.type)) {
    //   alert('Invalid file. Please upload a PNG or JPEG file with size less than 1MB.');
    //   return;
    // }

    // // Dispatch action to save the picture in Redux store
    // dispatch(uploadPicture(pictureFile));

    // // Handle other form submission logic
    // console.log('Form submitted:', { name, age, email, password1, gender, acceptTerms });
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

      {/* <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          ref={pictureInputRef}
        />
      </div> */}

      {/* Autocomplete control for country selection (use an appropriate library or create a custom component) */}

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
