import * as React from "react";
import { useCategories } from "../context/categoriesContext";
import DirectoryItem from "./DirectoryItem";

function Directory() {
	const { categoriesMap } = useCategories();

	return (
		<div className="w-full flex flex-wrap justify-between">
			{Object.keys(categoriesMap).map((category) => (
				<DirectoryItem
					key={categoriesMap[category].id}
					category={categoriesMap[category]}
				/>
			))}
		</div>
	);
}

export default Directory;
