import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  storedSearchValue: string | null;
}
const storedValue = localStorage.getItem('inputValue');
const initialState: SearchState = {
  storedSearchValue: '' || storedValue,
};

export const searchSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setStoredSearchValue(state, action: PayloadAction<string>) {
      state.storedSearchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
