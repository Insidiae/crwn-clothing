import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { CartProvider } from "./cartContext";

import { store } from "../store/store";

export function AppProviders({ children }) {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<CartProvider>{children}</CartProvider>
			</Provider>
		</BrowserRouter>
	);
}
