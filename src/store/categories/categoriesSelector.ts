import { createSelector } from "reselect";

import type { CategoriesState, CategoriesMap } from "./categoriesTypes";

export const selectCategoriesSlice = (state): CategoriesState =>
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
