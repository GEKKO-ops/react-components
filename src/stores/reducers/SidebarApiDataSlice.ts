import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IApi } from '../../utils/types/types';

interface ApiDataState {
  character: IApi;
  isLoading: boolean;
  error: string;
}

const initialState: ApiDataState = {
  character: {
    id: 0,
    name: '',
    status: '',
    species: '',
    gender: '',
    image: '',
  },
  isLoading: false,
  error: '',
};

export const sidebarApiDataSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    sidebarFetchingData(state) {
      state.isLoading = true;
    },
    sidebarFetchingSuccess(state, action: PayloadAction<IApi>) {
      state.isLoading = false;
      state.error = '';
      state.character = action.payload;
    },
    sidebarFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default sidebarApiDataSlice.reducer;
