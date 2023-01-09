import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./Reducers/authReducer";

import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";

import {
  adminReducer,
  recruimentReducer,
  updateAdminReducer,
} from "./Reducers/adminReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const reducer = combineReducers({
  auths: authReducer,
  admins: adminReducer,
  recruiment: recruimentReducer,
  infoAdmin: updateAdminReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
let initialState = {};
const middleware = [thunk];
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export let persistor = persistStore(store);
export default store;
