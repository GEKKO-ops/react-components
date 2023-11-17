import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import { fetchData } from '../service/apiService';
import itemsPerPageReducer from './reducers/ItemsPerPageSlice';
import viewModeReducer from './reducers/viewModeSlice';

export const rootReducer = combineReducers({
  searchReducer,
  [fetchData.reducerPath]: fetchData.reducer,
  itemsPerPageReducer,
  viewModeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(fetchData.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSrore = ReturnType<typeof setupStore>;
export type AppDispatch = AppSrore['dispatch'];
