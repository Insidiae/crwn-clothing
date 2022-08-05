import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

const persistConfig = {
	key: "root",
	storage,
	//? We sync our user state from Firebase anyway
	blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(logger);
}

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);
