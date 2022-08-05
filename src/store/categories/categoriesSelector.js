import { createSelector } from "reselect";

export const selectCategoriesSlice = (state) => state.categories;

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
		}, {})
);
