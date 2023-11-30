import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CountryState {
  countriesList: string[];
}

const initialState: CountryState = {
  countriesList: [],
};

export const countrySlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setStoredSearchValue(state, action: PayloadAction<string[]>) {
      state.countriesList = action.payload;
    },
  },
});

export default countrySlice.reducer;
