import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ItemsPerPageState {
  itemsNumber: string;
}

const initialState: ItemsPerPageState = {
  itemsNumber: '20',
};

export const itemsPerPageSlice = createSlice({
  name: 'itemPerPage',
  initialState,
  reducers: {
    setItemsPerPage(state, action: PayloadAction<string>) {
      state.itemsNumber = action.payload;
    },
  },
});

export default itemsPerPageSlice.reducer;
