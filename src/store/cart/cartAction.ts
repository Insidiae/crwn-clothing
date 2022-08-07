import { CART_ACTION_TYPES } from "./cartTypes";

import { createAction, withMatcher } from "../../utils/reducer";

import type { CartItem } from "./cartTypes";
import type { CategoryItem } from "../categories/categoriesTypes";
import type { ActionWithPayload } from "../../utils/reducer";

export const setIsCartOpen = withMatcher(
	(payload: boolean | ((prevState: boolean) => boolean)): SetIsCartOpenAction =>
		createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload)
);

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItemsAction =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => setCartItems(addCartItem(cartItems, productToAdd));

export const reduceItemFromCart = (
	cartItems: CartItem[],
	cartItemToReduce: CartItem
) => setCartItems(reduceCartItem(cartItems, cartItemToReduce));

export const removeItemFromCart = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
) => setCartItems(removeCartItem(cartItems, cartItemToRemove));

export type SetIsCartOpenAction = ActionWithPayload<
	CART_ACTION_TYPES.SET_IS_CART_OPEN,
	boolean | ((prevState: boolean) => boolean)
>;

export type SetCartItemsAction = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

function addCartItem(cartItems: CartItem[], productToAdd: CategoryItem) {
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

function reduceCartItem(cartItems: CartItem[], cartItemToReduce: CartItem) {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToReduce.id
	);

	if (existingCartItem?.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToReduce.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToReduce.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
}

function removeCartItem(cartItems: CartItem[], cartItemToRemove: CartItem) {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
}
