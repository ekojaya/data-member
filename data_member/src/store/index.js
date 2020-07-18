import { createStore } from "redux";
import { rootReducer } from "./Reducer";
import { LoadState, saveState } from "./LocalStorage";

const persistedState = LoadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
