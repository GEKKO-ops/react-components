import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UploadPictureState {
  uploadPicture: string | null;
}

const initialState: UploadPictureState = {
  uploadPicture: null,
};

export const uploadPictureSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string | null>) {
      state.uploadPicture = action.payload;
    },
  },
});

export default uploadPictureSlice.reducer;
