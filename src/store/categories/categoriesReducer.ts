import { AnyAction } from "redux";

import {
	fetchCategoriesStart,
	fetchCategoriesFailed,
	fetchCategoriesSuccess,
} from "./categoriesAction";

import type { CategoriesState } from "./categoriesTypes";

export function categoriesReducer(
	state = CATEGORIES_INITIAL_STATE,
	action: AnyAction
): CategoriesState {
	if (fetchCategoriesStart.match(action)) {
		return { ...state, status: "pending" };
	}

	if (fetchCategoriesFailed.match(action)) {
		return { ...state, status: "rejected", error: action.payload };
	}

	if (fetchCategoriesSuccess.match(action)) {
		return { ...state, status: "resolved", categories: action.payload };
	}

	return state;
}

// export function categoriesReducer(
// 	state = CATEGORIES_INITIAL_STATE,
// 	action: CategoriesAction
// ): CategoriesState {
// 	switch (action.type) {
// 		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
// 			return { ...state, status: "pending" };
// 		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
// 			return { ...state, status: "rejected", error: action.payload };
// 		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
// 			return { ...state, status: "resolved", categories: action.payload };
// 		default:
// 			return state;
// 	}
// }

const CATEGORIES_INITIAL_STATE: CategoriesState = {
	categories: [],
	//? https://kentcdodds.com/blog/stop-using-isloading-booleans
	status: "idle",
	error: null,
};
