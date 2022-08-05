import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { persistor, store } from "../store/store";

export function AppProviders({ children }) {
	return (
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<Provider store={store}>{children}</Provider>
			</PersistGate>
		</BrowserRouter>
	);
}
