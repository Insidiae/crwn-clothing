import { CART_ACTION_TYPES } from "./cartTypes";

export function cartReducer(state = CART_INITIAL_STATE, action) {
	switch (action.type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: action.payload,
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
			return state;
	}
}

const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};
