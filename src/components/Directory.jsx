import * as React from "react";
import CategoryItem from "./CategoryItem";

function Directory({ categories }) {
	return (
		<div className="w-full flex flex-wrap justify-between">
			{categories.map((category) => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
}

export default Directory;
