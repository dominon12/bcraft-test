import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { User } from "../Types/UserTypes";
import { FormState } from "../Types/FormTypes";
import userReducer from "./User/Reducer";
import formsReducer from "./Forms/Reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "forms"],
};

const rootReducer = combineReducers({
  user: userReducer,
  forms: formsReducer,
});

const rootPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(rootPersistReducer);
export const persistor = persistStore(store);

export interface RootState {
  user: User | null;
  forms: FormState[];
}
