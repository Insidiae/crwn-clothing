import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(logger);
}

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
