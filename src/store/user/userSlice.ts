import {
	createSlice,
	createAsyncThunk,
	createSelector,
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
});

const userSlice = createSlice({
	name: "user",
	initialState: USER_INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(checkUserSession.pending, (state) => {
				state.status = "pending";
			})
			.addCase(checkUserSession.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error as Error;
			})
			.addCase(checkUserSession.fulfilled, (state, action) => {
				state.status = "resolved";
				state.currentUser = action.payload;
			})
			.addCase(googleSignIn.pending, (state) => {
				state.status = "pending";
			})
			.addCase(googleSignIn.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error as Error;
			})
			.addCase(googleSignIn.fulfilled, (state, action) => {
				state.status = "resolved";
				state.currentUser = action.payload;
			})
			.addCase(emailSignIn.pending, (state) => {
				state.status = "pending";
			})
			.addCase(emailSignIn.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error as Error;
			})
			.addCase(emailSignIn.fulfilled, (state, action) => {
				state.status = "resolved";
				state.currentUser = action.payload;
			})
			.addCase(signUp.pending, (state) => {
				state.status = "pending";
			})
			.addCase(signUp.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error as Error;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.status = "resolved";
				state.currentUser = action.payload;
			})
			.addCase(signOut.pending, (state) => {
				state.status = "pending";
			})
			.addCase(signOut.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error as Error;
			})
			.addCase(signOut.fulfilled, (state) => {
				state.status = "resolved";
				state.currentUser = null;
			});
	},
});

export const selectUserSlice = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
	selectUserSlice,
	(user) => user.currentUser
);

export default userSlice.reducer;
