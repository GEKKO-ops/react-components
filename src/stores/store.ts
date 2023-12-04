import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
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

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(fetchData.middleware),
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
