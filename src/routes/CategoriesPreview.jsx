import * as React from "react";

import CategoryPreview from "../components/CategoryPreview";

import { useCategories } from "../context/categoriesContext";

function CategoriesPreview() {
	const { categoriesMap } = useCategories();

	return (
		<>
			{Object.keys(categoriesMap).map((categoryKey) => (
				<CategoryPreview
					key={categoryKey}
					categoryKey={categoryKey}
					products={categoriesMap[categoryKey]}
				/>
			))}
		</>
	);
}

export default CategoriesPreview;
