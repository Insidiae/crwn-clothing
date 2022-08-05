import { CATEGORIES_ACTION_TYPES } from "./categoriesTypes";

export function categoriesReducer(state = CATEGORIES_INITIAL_STATE, action) {
	switch (action.type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
			return { ...state, categories: action.payload };
		default:
			return state;
	}
}

const CATEGORIES_INITIAL_STATE = {
	categories: [],
};
