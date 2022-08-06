import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";

import { persistor, store } from "../store/store";

import { stripePromise } from "../utils/stripe";

export function AppProviders({ children }) {
	return (
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<Provider store={store}>
					<Elements stripe={stripePromise}>{children}</Elements>
				</Provider>
			</PersistGate>
		</BrowserRouter>
	);
}
