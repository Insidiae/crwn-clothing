import * as React from "react";

import { createAction } from "../utils/reducer";

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

function cartReducer(state, action) {
	switch (action.type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...updateCartItemsReducer(action.payload),
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				//? Simulate setState allowing a regular value OR a function
				isCartOpen:
					typeof action.payload === "function"
						? action.payload(state.isCartOpen)
						: action.payload,
			};
		default:
			throw new Error(`Invalid action type "${action.type}".`);
	}
}

//? https://kentcdodds.com/blog/dont-sync-state-derive-it#what-about-usereducer
function updateCartItemsReducer(newCartItems) {
	const newCartCount = newCartItems.reduce(
		(count, cartItem) => count + cartItem.quantity,
		0
	);

	const newCartTotal = newCartItems.reduce(
		(currentTotal, cartItem) =>
			currentTotal + cartItem.quantity * cartItem.price,
		0
	);

	return {
		cartItems: newCartItems,
		cartCount: newCartCount,
		cartTotal: newCartTotal,
	};
}

export const CART_ACTION_TYPES = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

function CartProvider(props) {
	const [state, dispatch] = React.useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, cartCount, cartTotal } = state;

	function setIsCartOpen(payload) {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload));
	}

	function addItemToCart(productToAdd) {
		dispatch(
			createAction(
				CART_ACTION_TYPES.SET_CART_ITEMS,
				addCartItem(cartItems, productToAdd)
			)
		);
	}

	function reduceItemFromCart(cartItemToReduce) {
		dispatch(
			createAction(
				CART_ACTION_TYPES.SET_CART_ITEMS,
				reduceCartItem(cartItems, cartItemToReduce)
			)
		);
	}

	function removeItemFromCart(cartItemToRemove) {
		dispatch(
			createAction(
				CART_ACTION_TYPES.SET_CART_ITEMS,
				removeCartItem(cartItems, cartItemToRemove)
			)
		);
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
