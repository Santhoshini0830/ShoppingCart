import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducers/index";

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export default store;
export { persistor };
