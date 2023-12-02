import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormDataStored } from '../../utils/types/types';

interface formDataState {
  storedFormData: IFormDataStored;
}

const initialState: formDataState = {
  storedFormData: {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    country: '',
    picture: '',
  },
};

export const formDataSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<IFormDataStored>>) {
      state.storedFormData = { ...state.storedFormData, ...action.payload };
    },
  },
});

export default formDataSlice.reducer;
