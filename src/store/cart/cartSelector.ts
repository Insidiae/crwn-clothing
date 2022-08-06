import { createSelector } from "reselect";

import type { CartState } from "./cartTypes";

export const selectCartSlice = (state): CartState => state.cart;

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
