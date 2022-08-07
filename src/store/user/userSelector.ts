import { createSelector } from "reselect";

import type { RootState } from "../rootReducer";
import type { UserState } from "./userTypes";

export const selectUserSlice = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
	selectUserSlice,
	(user) => user.currentUser
);
