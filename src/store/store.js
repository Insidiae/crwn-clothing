import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./rootReducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(logger);
}

middlewares.push(thunk);

const composeEnhancer =
	(process.env.NODE_ENV === `development` &&
		window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);
