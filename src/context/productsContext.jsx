import * as React from "react";

import PRODUCTS from "../shop-data.json";

const ProductsContext = React.createContext({
	products: [],
	setProducts: () => null,
});
ProductsContext.displayName = "ProductsContext";

function ProductsProvider(props) {
	const [products, setProducts] = React.useState(PRODUCTS);

	const value = { products, setProducts };

	return <ProductsContext.Provider value={value} {...props} />;
}

function useProducts() {
	const context = React.useContext(ProductsContext);

	if (context === undefined) {
		throw new Error(`useProducts must be used within a ProductsProvider`);
	}

	return context;
}

export { ProductsProvider, useProducts };
