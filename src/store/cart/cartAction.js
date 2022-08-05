import { CART_ACTION_TYPES } from "./cartTypes";

import { createAction } from "../../utils/reducer";

export const setIsCartOpen = (payload) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload);

export const addItemToCart = (cartItems, productToAdd) =>
	createAction(
		CART_ACTION_TYPES.SET_CART_ITEMS,
		addCartItem(cartItems, productToAdd)
	);

export const reduceItemFromCart = (cartItems, cartItemToReduce) =>
	createAction(
		CART_ACTION_TYPES.SET_CART_ITEMS,
		reduceCartItem(cartItems, cartItemToReduce)
	);

export const removeItemFromCart = (cartItems, cartItemToRemove) =>
	createAction(
		CART_ACTION_TYPES.SET_CART_ITEMS,
		removeCartItem(cartItems, cartItemToRemove)
	);

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
