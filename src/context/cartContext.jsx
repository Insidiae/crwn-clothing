import * as React from "react";

const CartContext = React.createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});
CartContext.displayName = "CartContext";

function CartProvider(props) {
	const [isCartOpen, setIsCartOpen] = React.useState(false);
	const [cartItems, setCartItems] = React.useState([]);

	//? https://kentcdodds.com/blog/dont-sync-state-derive-it
	const cartCount = cartItems.reduce(
		(count, cartItem) => count + cartItem.quantity,
		0
	);

	function addItemToCart(productToAdd) {
		setCartItems(addCartItem(cartItems, productToAdd));
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
	};

	return <CartContext.Provider value={value} {...props} />;
}

function addCartItem(cartItems, productToAdd) {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function useCart() {
	const context = React.useContext(CartContext);

	if (context === undefined) {
		throw new Error(`useCart must be used within a CartProvider`);
	}

	return context;
}

export { CartProvider, useCart };
