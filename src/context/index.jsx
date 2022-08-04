import React from "react";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./userContext";
import { CategoriesProvider } from "./categoriesContext";
import { CartProvider } from "./cartContext";

export function AppProviders({ children }) {
	return (
		<BrowserRouter>
			<UserProvider>
				<CategoriesProvider>
					<CartProvider>{children}</CartProvider>
				</CategoriesProvider>
			</UserProvider>
		</BrowserRouter>
	);
}
