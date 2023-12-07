import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormDataStored } from '../../utils/types/types';

interface formDataState {
  storedFormData: IFormDataStored;
  formDataHistory: IFormDataStored[];
  lastSubmittedFormIndex: number;
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
  formDataHistory: [],
  lastSubmittedFormIndex: 0,
};

export const formDataSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<IFormDataStored>>) {
      state.storedFormData = { ...state.storedFormData, ...action.payload };
      state.formDataHistory = [...state.formDataHistory, state.storedFormData];
      state.lastSubmittedFormIndex = state.formDataHistory.length - 1;
    },
  },
});

export const { updateFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
