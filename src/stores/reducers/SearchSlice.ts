import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  localStorageValue: string | null;
}
const storedValue = localStorage.getItem('inputValue');
const initialState: SearchState = {
  localStorageValue: '' || storedValue,
};

export const searchSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setLocalStorageValue(state, action: PayloadAction<string>) {
      state.localStorageValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
