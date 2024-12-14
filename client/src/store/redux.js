import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./user/userSlice";

const userConfig = {
  key: "shop/user",
  storage,
  whitelist: ["isLoggedIn", "token", "current", "currentCart"],
};

const persistedUserReducer = persistReducer(userConfig, userReducer);

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
