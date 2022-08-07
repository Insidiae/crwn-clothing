import * as React from "react";
import { useSelector } from "react-redux";

import DirectoryItem from "./DirectoryItem";

import {
	selectCategoriesMap,
	selectCategoriesStatus,
} from "../store/categories/categoriesSlice";
import Spinner from "./Spinner";

function Directory() {
	const categoriesStatus = useSelector(selectCategoriesStatus);
	const categoriesMap = useSelector(selectCategoriesMap);

	return (
		<div className="w-full flex flex-wrap justify-between">
			{categoriesStatus === "pending" ? <Spinner /> : null}
			{categoriesStatus === "resolved"
				? Object.keys(categoriesMap).map((category) => (
						<DirectoryItem
							key={categoriesMap[category].title}
							category={categoriesMap[category]}
						/>
				  ))
				: null}
		</div>
	);
}

export default Directory;
