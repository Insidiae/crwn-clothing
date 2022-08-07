import { createSlice, createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../rootReducer";
import type { CartItem, CartState } from "./cartTypes";
import type { CategoryItem } from "../categories/categoriesTypes";

const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: CART_INITIAL_STATE,
	reducers: {
		setIsCartOpen(state, action) {
			if (typeof action.payload === "function") {
				state.isCartOpen = action.payload(state.isCartOpen);
			} else {
				state.isCartOpen = action.payload;
			}
		},
		toggleIsCartOpen(state) {
			state.isCartOpen = !state.isCartOpen;
		},
		setCartItems(state, action) {
			state.cartItems = action.payload;
		},
		addCartItem(state, action) {
			let itemAlreadyInCart = false;
			for (const cartItem of state.cartItems) {
				if (cartItem.id === action.payload.id) {
					itemAlreadyInCart = true;
					cartItem.quantity += 1;
					break;
				}
			}

			if (!itemAlreadyInCart) {
				state.cartItems.push({ ...action.payload, quantity: 1 });
			}
		},
		reduceCartItem(state, action) {
			for (const cartItem of state.cartItems) {
				if (cartItem.id === action.payload.id) {
					if (cartItem.quantity === 1) {
						state.cartItems = state.cartItems.filter(
							(cartItem) => cartItem.id !== action.payload.id
						);
						return;
					} else {
						cartItem.quantity -= 1;
						break;
					}
				}
			}
		},
		removeCartItem(state, action) {
			state.cartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== action.payload.id
			);
		},
	},
});

const {
	setCartItems,
	addCartItem,
	reduceCartItem,
	removeCartItem,
	setIsCartOpen,
	toggleIsCartOpen,
} = cartSlice.actions;

export const selectCartSlice = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
	[selectCartSlice],
	(cartSlice) => cartSlice.isCartOpen
);

export const selectCartItems = createSelector(
	[selectCartSlice],
	(cartSlice) => cartSlice.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(currentTotal, cartItem) =>
			currentTotal + cartItem.quantity * cartItem.price,
		0
	)
);

export const addItemToCart = (productToAdd: CategoryItem) =>
	addCartItem(productToAdd);

export const reduceItemFromCart = (cartItemToReduce: CartItem) =>
	reduceCartItem(cartItemToReduce);

export const removeItemFromCart = (cartItemToRemove: CartItem) =>
	removeCartItem(cartItemToRemove);

export { setCartItems, setIsCartOpen, toggleIsCartOpen };

export default cartSlice.reducer;
