import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer";
import { LoadState, saveState } from "./LocalStorage";

const persistedState = LoadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
