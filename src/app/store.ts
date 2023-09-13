import { configureStore } from "@reduxjs/toolkit";

// Redux Persist
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import taskReducer from "../features/tasks/taskSlice";
import userReducer from "../features/users/userSlice";

const persistTaskConfig = {
  key: "tasks",
  version: 1,
  storage,
};

const persistUserConfig = {
  key: "users",
  version: 1,
  storage,
};

// To persist data on localstorage
const persistedTaskReducer = persistReducer(persistTaskConfig, taskReducer);
const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

// Store config
const store = configureStore({
  reducer: {
    tasks: persistedTaskReducer,
    users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
