import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiData } from '../../utils/types/types';

interface ApiDataState {
  apiData: ApiData;
  isLoading: boolean;
  error: string;
}

const initialState: ApiDataState = {
  apiData: { results: [], total: 0 },
  isLoading: false,
  error: '',
};

export const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    apiFetchingData(state) {
      state.isLoading = true;
    },
    apiFetchingSuccess(state, action: PayloadAction<ApiData>) {
      state.isLoading = false;
      state.error = '';
      state.apiData = action.payload;
    },
    apiFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default apiDataSlice.reducer;
