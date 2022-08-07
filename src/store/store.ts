import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	PERSIST,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./rootReducer";

import type { PersistConfig } from "redux-persist";
import type { RootState } from "./rootReducer";

type ExtendedPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: [PERSIST, REHYDRATE],
				// Ignore these paths in the state
				ignoredPaths: ["_persist"],
			},
		}),
});

export const persistor = persistStore(store);
