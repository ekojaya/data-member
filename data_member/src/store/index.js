import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { rootReducer } from "./Reducer";
import { LoadState, saveState } from "./LocalStorage";
import dataReducer from "./SliceData";

import { reducer as SliceFireStore } from "./SliceFireStore";

const rootReducer = combineReducers({
  data: dataReducer,
  datas: SliceFireStore,
});

const persistedState = LoadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
