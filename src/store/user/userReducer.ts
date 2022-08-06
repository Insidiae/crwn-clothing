import { AnyAction } from "redux";

import {
	signUpFailed,
	signInFailed,
	signOutFailed,
	signInSuccess,
	signOutSuccess,
} from "./userAction";

import type { UserState } from "./userTypes";

export function userReducer(
	state = USER_INITIAL_STATE,
	action: AnyAction
): UserState {
	if (
		signUpFailed.match(action) ||
		signInFailed.match(action) ||
		signOutFailed.match(action)
	) {
		return { ...state, status: "rejected", error: action.payload };
	}

	if (signInSuccess.match(action)) {
		return { ...state, status: "resolved", currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return { ...state, status: "resolved", currentUser: null };
	}

	return state;
}

// export function userReducer(state = USER_INITIAL_STATE, action) {
// 	switch (action.type) {
// 		case USER_ACTION_TYPES.SIGN_UP_FAILED:
// 		case USER_ACTION_TYPES.SIGN_IN_FAILED:
// 		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
// 			return { ...state, status: "rejected", error: action.payload };
// 		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
// 			return { ...state, status: "resolved", currentUser: action.payload };
// 		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
// 			return { ...state, status: "resolved", currentUser: null };
// 		default:
// 			return state;
// 	}
// }

const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	status: "idle",
	error: null,
};
