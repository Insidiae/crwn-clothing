import {
	createSlice,
	createAsyncThunk,
	createSelector,
	isAnyOf,
} from "@reduxjs/toolkit";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from "../../utils/firebase";

import type { User } from "firebase/auth";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import type { RootState } from "../rootReducer";
import type { UserState, UserData, AdditionalInformation } from "./userTypes";

const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	status: "idle",
	error: null,
};

async function getSnapshotFromAuthUser(
	authUser: User,
	additionalDetails?: AdditionalInformation
) {
	const userSnapshot = (await createUserDocumentFromAuth(
		authUser,
		additionalDetails
	)) as QueryDocumentSnapshot<UserData>;

	return { id: userSnapshot.id, ...userSnapshot.data() };
}

export const checkUserSession = createAsyncThunk(
	"user/CHECK_USER_SESSION",
	async () => {
		const authUser = await getCurrentUser();

		if (authUser) {
			return getSnapshotFromAuthUser(authUser);
		}

		return null;
	}
);

export const googleSignIn = createAsyncThunk(
	"user/GOOGLE_SIGN_IN",
	async () => {
		const { user } = await signInWithGooglePopup();

		return getSnapshotFromAuthUser(user);
	}
);

export const emailSignIn = createAsyncThunk(
	"user/EMAIL_SIGN_IN",
	async (payload: { email: string; password: string }) => {
		const { email, password } = payload;

		const userCredential = await signInAuthUserWithEmailAndPassword(
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential;

			return getSnapshotFromAuthUser(user);
		}

		return null;
	}
);

export const signUp = createAsyncThunk(
	"user/SIGN_UP",
	async (payload: { email: string; password: string; displayName: string }) => {
		const { email, password, displayName } = payload;

		const userCredential = await createAuthUserWithEmailAndPassword(
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential;

			return getSnapshotFromAuthUser(user, { displayName });
		}

		return null;
	}
);

export const signOut = createAsyncThunk("user/SIGN_OUT", async () => {
	await signOutUser();
	return null;
});

const userSlice = createSlice({
	name: "user",
	initialState: USER_INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isAnyOf(
					checkUserSession.pending,
					googleSignIn.pending,
					emailSignIn.pending,
					signUp.pending,
					signOut.pending
				),
				(state) => {
					state.status = "pending";
				}
			)
			.addMatcher(
				isAnyOf(
					checkUserSession.rejected,
					googleSignIn.rejected,
					emailSignIn.rejected,
					signUp.rejected,
					signOut.rejected
				),
				(state, action) => {
					state.status = "rejected";
					state.error = action.error as Error;
				}
			)
			.addMatcher(
				isAnyOf(
					checkUserSession.fulfilled,
					googleSignIn.fulfilled,
					emailSignIn.fulfilled,
					signUp.fulfilled,
					signOut.fulfilled
				),
				(state, action) => {
					state.status = "resolved";
					state.currentUser = action.payload;
				}
			);
	},
});

export const selectUserSlice = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
	selectUserSlice,
	(user) => user.currentUser
);

export default userSlice.reducer;
