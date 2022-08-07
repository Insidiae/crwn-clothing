import { AnyAction } from "redux";

import { setIsCartOpen, setCartItems } from "./cartAction";

import type { CartState } from "./cartTypes";

export function cartReducer(
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartState {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			//? Simulate setState allowing a regular value OR a function
			isCartOpen:
				typeof action.payload === "function"
					? action.payload(state.isCartOpen)
					: action.payload,
		};
	}

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload,
		};
	}

	return state;
}

// export function cartReducer(state = CART_INITIAL_STATE, action): CartState {
// 	switch (action.type) {
// 		case CART_ACTION_TYPES.SET_CART_ITEMS:
// 			return {
// 				...state,
// 				cartItems: action.payload,
// 			};
// 		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
// 			return {
// 				...state,
// 				//? Simulate setState allowing a regular value OR a function
// 				isCartOpen:
// 					typeof action.payload === "function"
// 						? action.payload(state.isCartOpen)
// 						: action.payload,
// 			};
// 		default:
// 			return state;
// 	}
// }

const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};
