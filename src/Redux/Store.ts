import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/Reducer";
import { User } from "../Types/UserTypes";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const rootPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootPersistReducer);
export const persistor = persistStore(store);

export interface RootState {
  user: User | null;
}
