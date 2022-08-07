import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./rootSaga";

import { rootReducer } from "./rootReducer";

import type { Middleware } from "redux";
import type { PersistConfig } from "redux-persist";
import type { RootState } from "./rootReducer";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(logger);
}

// middlewares.push(thunk);
middlewares.push(sagaMiddleware);

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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
