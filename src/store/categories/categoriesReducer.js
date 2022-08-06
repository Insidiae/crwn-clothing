import { CATEGORIES_ACTION_TYPES } from "./categoriesTypes";

export function categoriesReducer(state = CATEGORIES_INITIAL_STATE, action) {
	switch (action.type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return { ...state, status: "pending" };
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return { ...state, status: "rejected", error: action.payload };
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return { ...state, status: "resolved", categories: action.payload };
		default:
			return state;
	}
}

const CATEGORIES_INITIAL_STATE = {
	categories: [],
	//? https://kentcdodds.com/blog/stop-using-isloading-booleans
	status: "idle",
	error: null,
};
