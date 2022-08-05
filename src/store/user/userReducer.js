import { USER_ACTION_TYPES } from "./userTypes";

export function userReducer(state = USER_INITIAL_STATE, action) {
	switch (action.type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: action.payload };
		default:
			return state;
	}
}

const USER_INITIAL_STATE = {
	currentUser: null,
};
