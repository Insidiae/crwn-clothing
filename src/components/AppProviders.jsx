import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store/store";

export function AppProviders({ children }) {
	return (
		<BrowserRouter>
			<Provider store={store}>{children}</Provider>
		</BrowserRouter>
	);
}
