import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';

export const rootReducer = combineReducers({
  searchReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSrore = ReturnType<typeof setupStore>;
export type AppDispatch = AppSrore['dispatch'];
