import * as React from "react";

const CartContext = React.createContext({
	isCartOpen: false,
	setIsCartOpen: () => null,
});
CartContext.displayName = "CartContext";

function CartProvider(props) {
	const [isCartOpen, setIsCartOpen] = React.useState(false);

	const value = { isCartOpen, setIsCartOpen };

	return <CartContext.Provider value={value} {...props} />;
}

function useCart() {
	const context = React.useContext(CartContext);

	if (context === undefined) {
		throw new Error(`useCart must be used within a CartProvider`);
	}

	return context;
}

export { CartProvider, useCart };
