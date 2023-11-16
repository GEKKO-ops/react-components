import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/SearchSlice';
import apiReducer from './reducers/ApiDataSlice';
import sidebarReducer from './reducers/SidebarApiDataSlice';

export const rootReducer = combineReducers({
  searchReducer,
  apiReducer,
  sidebarReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppSrore = ReturnType<typeof setupStore>;
export type AppDispatch = AppSrore['dispatch'];
