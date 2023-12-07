import * as yup from 'yup';

export const SCHEMA = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z].*$/, '⚠️ First letter should be uppercase')
    .required('⚠️ Name is required'),
  age: yup
    .number()
    .transform((value) => {
      return isNaN(value) ? undefined : Number(value);
    })
    .positive('⚠️ Age should be a positive number')
    .required('⚠️ Age is required'),
  email: yup
    .string()
    .email('⚠️ Invalid email')
    .required('⚠️ Email is required'),
  password: yup
    .string()
    .min(4)
    .max(24)
    .matches(/[A-Z]/, 'Password should have at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password should have at least 1 lowercase letter')
    .matches(/[0-9]/, 'Password should have at least 1 number')
    .matches(/[@$!%*#?&]/, 'Password should have at least 1 special character')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], '⚠️ Passwords must match')
    .required('⚠️ Confirm Password is required'),
  gender: yup.string().required('⚠️ Gender is required'),
  country: yup.string().required('⚠️ Country is required'),
  terms: yup
    .bool()
    .oneOf([true], '⚠️ You must accept the terms and conditions')
    .required(),
  picture: yup
    .mixed<FileList>()
    .test('filePresence', '⚠️ A file is required', (value) => {
      const file = (value as FileList)?.[0];
      return !!file;
    })
    .test('fileSize', '⚠️ File size must be less than 1MB', (value) => {
      const file = (value as FileList)?.[0];
      return !file || file.size < 1024 * 1024;
    })
    .test(
      'fileType',
      '⚠️ Unsupported File Format, .jpeg, .jpg, .png only',
      (value) => {
        const file = (value as FileList)?.[0];
        const extension =
          file && file.name
            ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
            : '';
        return !file || ['.jpeg', '.jpg', '.png'].includes(extension);
      }
    ),
});
