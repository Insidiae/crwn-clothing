import * as React from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../components/CategoryPreview";
import Spinner from "../components/Spinner";

import {
	selectCategoriesMap,
	selectCategoriesStatus,
} from "../store/categories/categoriesSlice";

function CategoriesPreview() {
	const categoriesStatus = useSelector(selectCategoriesStatus);
	const categoriesMap = useSelector(selectCategoriesMap);

	return (
		<>
			{categoriesStatus === "pending" ? <Spinner /> : null}
			{categoriesStatus === "resolved"
				? Object.keys(categoriesMap).map((categoryKey) => (
						<CategoryPreview
							key={categoryKey}
							categoryKey={categoryKey}
							products={categoriesMap[categoryKey].items}
						/>
				  ))
				: null}
		</>
	);
}

export default CategoriesPreview;
