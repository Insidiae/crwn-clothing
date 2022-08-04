import * as React from "react";

const CartContext = React.createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	reduceItemFromCart: () => {},
	removeItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
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

	const cartTotal = cartItems.reduce(
		(currentTotal, cartItem) =>
			currentTotal + cartItem.quantity * cartItem.price,
		0
	);

	function addItemToCart(productToAdd) {
		setCartItems(addCartItem(cartItems, productToAdd));
	}

	function reduceItemFromCart(cartItemToReduce) {
		setCartItems(reduceCartItem(cartItems, cartItemToReduce));
	}

	function removeItemFromCart(cartItemToRemove) {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		reduceItemFromCart,
		removeItemFromCart,
		cartCount,
		cartTotal,
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

function reduceCartItem(cartItems, cartItemToReduce) {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToReduce.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToReduce.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToReduce.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
}

function removeCartItem(cartItems, cartItemToRemove) {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
}

function useCart() {
	const context = React.useContext(CartContext);

	if (context === undefined) {
		throw new Error(`useCart must be used within a CartProvider`);
	}

	return context;
}

export { CartProvider, useCart };
