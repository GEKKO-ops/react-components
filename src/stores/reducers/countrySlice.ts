import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CountryState {
  countriesList: string[];
}

const initialState: CountryState = {
  countriesList: [],
};

export const countrySlice = createSlice({
  name: 'countryList',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countriesList = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
