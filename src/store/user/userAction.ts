import { USER_ACTION_TYPES } from "./userTypes";

import { createAction, withMatcher } from "../../utils/reducer";

import type { User } from "firebase/auth";
import type { UserData, AdditionalInformation } from "./userTypes";
import type { Action, ActionWithPayload } from "../../utils/reducer";

export const checkUserSession = withMatcher(
	(): CheckUserSessionAction =>
		createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
	(): GoogleSignInStartAction =>
		createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStartAction =>
		createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
	(user: UserData & { id: string }): SignInSuccessAction =>
		createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
	(error: Error): SignInFailedAction =>
		createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStartAction =>
		createAction(USER_ACTION_TYPES.SIGN_UP_START, {
			email,
			password,
			displayName,
		})
);

export const signUpSuccess = withMatcher(
	(user: User, additionalDetails: AdditionalInformation): SignUpSuccessAction =>
		createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailed = withMatcher(
	(error: Error): SignUpFailedAction =>
		createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
	(): SignOutStartAction => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
	(): SignOutSuccessAction => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
	(error: Error): SignOutFailedAction =>
		createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

export type CheckUserSessionAction =
	Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStartAction =
	Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStartAction = ActionWithPayload<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;
export type SignInSuccessAction = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	UserData
>;
export type SignInFailedAction = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_IN_FAILED,
	Error
>;

export type SignUpStartAction = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;
export type SignUpSuccessAction = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{ user: User; additionalDetails: AdditionalInformation }
>;
export type SignUpFailedAction = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_FAILED,
	Error
>;

export type SignOutStartAction = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccessAction = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailedAction = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_OUT_FAILED,
	Error
>;
