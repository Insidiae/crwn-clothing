import { CATEGORIES_ACTION_TYPES } from "./categoriesTypes";

import { createAction, withMatcher } from "../../utils/reducer";
// import { getCategoriesAndDocuments } from "../../utils/firebase";

import type { Category } from "./categoriesTypes";
import type { Action, ActionWithPayload } from "../../utils/reducer";

export type FetchCategoriesStartAction =
	Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesFailedAction = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;
export type FetchCategoriesSuccessAction = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;

export const fetchCategoriesStart = withMatcher(
	(): FetchCategoriesStartAction =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesFailed = withMatcher(
	(error: Error): FetchCategoriesFailedAction =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);

export const fetchCategoriesSuccess = withMatcher(
	(categories: Category[]): FetchCategoriesSuccessAction =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);

// export const fetchCategoriesAsync = () => async (dispatch) => {
// 	dispatch(fetchCategoriesStart());

// 	try {
// 		const categories = await getCategoriesAndDocuments();
// 		dispatch(fetchCategoriesSuccess(categories));
// 	} catch (error) {
// 		dispatch(fetchCategoriesFailed(error));
// 	}
// };
