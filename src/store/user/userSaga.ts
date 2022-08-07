import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./userTypes";
import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
} from "./userAction";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from "../../utils/firebase";

import type { CallEffect, PutEffect } from "redux-saga/effects";
import type { User, UserCredential } from "firebase/auth";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import type {
	EmailSignInStartAction,
	SignInSuccessAction,
	SignInFailedAction,
	SignUpStartAction,
	SignUpSuccessAction,
} from "./userAction";
import type { UserData, AdditionalInformation } from "./userTypes";

export function* getSnapshotFromAuthUser(
	authUser: User,
	additionalDetails?: AdditionalInformation
): Generator<
	| CallEffect<void | QueryDocumentSnapshot<UserData>>
	| PutEffect<SignInSuccessAction>
	| PutEffect<SignInFailedAction>,
	void,
	unknown
> {
	try {
		const userSnapshot = (yield call(
			createUserDocumentFromAuth,
			authUser,
			additionalDetails
		)) as QueryDocumentSnapshot<UserData>;

		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailed(error as Error));
	}
}

export function* signInWithGoogle(): Generator<
	CallEffect<UserCredential> | CallEffect<void> | PutEffect<SignInFailedAction>,
	void,
	unknown
> {
	try {
		const { user } = (yield call(signInWithGooglePopup)) as UserCredential;
		yield call(getSnapshotFromAuthUser, user);
	} catch (error) {
		yield put(signInFailed(error as Error));
	}
}

export function* signInWithEmail(action: EmailSignInStartAction) {
	const { email, password } = action.payload;

	try {
		const userCredential = (yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		)) as Awaited<ReturnType<typeof signInAuthUserWithEmailAndPassword>>;

		if (userCredential) {
			const { user } = userCredential;
			yield call(getSnapshotFromAuthUser, user);
		}
	} catch (error) {
		yield put(signInFailed(error as Error));
	}
}

export function* isUserAuthenticated(): Generator<
	CallEffect<User | null> | CallEffect<void> | PutEffect<SignInFailedAction>,
	void,
	unknown
> {
	try {
		const authUser = (yield call(getCurrentUser)) as Awaited<
			ReturnType<typeof getCurrentUser>
		>;
		if (authUser) {
			yield call(getSnapshotFromAuthUser, authUser);
		}
	} catch (error) {
		yield put(signInFailed(error as Error));
	}
}

export function* signUp(action: SignUpStartAction) {
	const { email, password, displayName } = action.payload;

	try {
		const userCredential = (yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		)) as Awaited<ReturnType<typeof createAuthUserWithEmailAndPassword>>;

		if (userCredential) {
			const { user } = userCredential;
			yield put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield put(signUpFailed(error as Error));
	}
}

export function* signInAfterSignUp(action: SignUpSuccessAction) {
	const { user, additionalDetails } = action.payload;

	yield call(getSnapshotFromAuthUser, user, additionalDetails);
}

export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error as Error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
