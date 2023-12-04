import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ViewModeState {
  isSideBarOpen: boolean;
}

const initialState: ViewModeState = {
  isSideBarOpen: false,
};

export const viewModeSlice = createSlice({
  name: 'sidebarView',
  initialState,
  reducers: {
    setIsSideBarOpen(state, action: PayloadAction<boolean>) {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setIsSideBarOpen } = viewModeSlice.actions;
export default viewModeSlice.reducer;
