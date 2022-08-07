import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";

import { getCategoriesAndDocuments } from "../../utils/firebase";

import type { CategoriesState, CategoriesMap } from "./categoriesTypes";
import type { RootState } from "../rootReducer";

const CATEGORIES_INITIAL_STATE: CategoriesState = {
	categories: [],
	//? https://kentcdodds.com/blog/stop-using-isloading-booleans
	status: "idle",
	error: null,
};

export const fetchCategories = createAsyncThunk(
	"categories/FETCH_CATEGORIES",
	async () => {
		const categories = await getCategoriesAndDocuments();
		return categories;
	}
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState: CATEGORIES_INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload as Error;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = "resolved";
				state.categories = action.payload;
			});
	},
});

export const selectCategoriesSlice = (state: RootState): CategoriesState =>
	state.categories;

export const selectCategoriesDocuments = createSelector(
	[selectCategoriesSlice],
	(categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategoriesDocuments],
	(categories) =>
		categories.reduce((categories, category) => {
			const { title, imageUrl, items } = category;

			categories[title.toLowerCase()] = {
				title: title.toLowerCase(),
				imageUrl,
				items,
			};

			return categories;
		}, {} as CategoriesMap)
);

export const selectCategoriesStatus = createSelector(
	[selectCategoriesSlice],
	(categoriesSlice) => categoriesSlice.status
);

export default categoriesSlice.reducer;
