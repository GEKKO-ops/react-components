import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  storedSearchValue: string | null;
}
const getInitialStoredValue = () => localStorage.getItem('inputValue') || '';
const initialState: SearchState = {
  storedSearchValue: getInitialStoredValue(),
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
