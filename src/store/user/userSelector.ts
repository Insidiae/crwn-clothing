import { createSelector } from "reselect";

import type { UserState } from "./userTypes";

export const selectUserSlice = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
	selectUserSlice,
	(user) => user.currentUser
);
