import { USER_ACTION_TYPES } from "./userTypes";

export function userReducer(state = USER_INITIAL_STATE, action) {
	switch (action.type) {
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
			return { ...state, status: "rejected", error: action.payload };
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, status: "resolved", currentUser: action.payload };
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, status: "resolved", currentUser: null };
		default:
			return state;
	}
}

const USER_INITIAL_STATE = {
	currentUser: null,
	status: "idle",
	error: null,
};
