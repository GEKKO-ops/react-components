import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../utils/types/types';

interface formDataState {
  storedFormData: IFormData;
}

const initialState: formDataState = {
  storedFormData: {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    accept: false,
    country: '',
    picture: '',
  },
};

export const formDataSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<IFormData>>) {
      state.storedFormData = { ...state.storedFormData, ...action.payload };
    },
  },
});

export default formDataSlice.reducer;
