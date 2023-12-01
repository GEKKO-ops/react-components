import * as Yup from 'yup';

export const SCHEMA = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z].*$/, '⚠️ First letter should be uppercase')
    .required('⚠️ Name is required'),
  age: Yup.number()
    .transform((value) => {
      return isNaN(value) ? undefined : Number(value);
    })
    .positive('⚠️ Age should be a positive number')
    .required('⚠️ Age is required'),
  email: Yup.string()
    .email('⚠️ Invalid email')
    .required('⚠️ Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      '⚠️ Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('⚠️ Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], '⚠️ Passwords must match')
    .required('⚠️ Confirm Password is required'),
  gender: Yup.string().required('⚠️ Gender is required'),
  country: Yup.string().required('⚠️ Country is required'),
  terms: Yup.bool()
    .oneOf([true], '⚠️ You must accept the terms and conditions')
    .required(),
  picture: Yup.mixed()
    .required('⚠️ A file is required')
    .test('fileSize', '⚠️ File size must be less than 1MB', (value) => {
      if (!value) return false;

      const base64String = (value as string).split(',')[1];
      const decodedImage = atob(base64String);

      return decodedImage.length <= 1024000;
    })
    .test(
      'fileType',
      '⚠️ Unsupported File Format - jpeg, png only',
      (value) => {
        if (!value) return false;

        const mimeInfo = (value as string).match(
          /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
        );
        const mimeType = mimeInfo && mimeInfo[1] ? mimeInfo[1] : '';

        return ['image/png', 'image/jpeg'].includes(mimeType);
      }
    ),
});
