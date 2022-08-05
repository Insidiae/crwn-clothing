import { USER_ACTION_TYPES } from "./userTypes";

export function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: action.payload };
		default:
			return state;
	}
}

const INITIAL_STATE = {
	currentUser: null,
};
