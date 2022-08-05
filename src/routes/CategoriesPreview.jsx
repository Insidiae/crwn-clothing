import * as React from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../components/CategoryPreview";

import { selectCategoriesMap } from "../store/categories/categoriesSelector";

function CategoriesPreview() {
	const categoriesMap = useSelector(selectCategoriesMap);

	return (
		<>
			{Object.keys(categoriesMap).map((categoryKey) => (
				<CategoryPreview
					key={categoryKey}
					categoryKey={categoryKey}
					products={categoriesMap[categoryKey].items}
				/>
			))}
		</>
	);
}

export default CategoriesPreview;
