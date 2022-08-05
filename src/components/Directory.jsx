import * as React from "react";
import { useSelector } from "react-redux";

import DirectoryItem from "./DirectoryItem";

import { selectCategoriesSlice } from "../store/categories/categoriesSelector";

function Directory() {
	const { categoriesMap } = useSelector(selectCategoriesSlice);

	return (
		<div className="w-full flex flex-wrap justify-between">
			{Object.keys(categoriesMap).map((category) => (
				<DirectoryItem
					key={categoriesMap[category].title}
					category={categoriesMap[category]}
				/>
			))}
		</div>
	);
}

export default Directory;
