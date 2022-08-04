import React from "react";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./userContext";
import { ProductsProvider } from "./productsContext";
import { CartProvider } from "./cartContext";

export function AppProviders({ children }) {
	return (
		<BrowserRouter>
			<UserProvider>
				<ProductsProvider>
					<CartProvider>{children}</CartProvider>
				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
	);
}
