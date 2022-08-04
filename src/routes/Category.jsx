import * as React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import { useCategories } from "../context/categoriesContext";

function Category() {
	const { category } = useParams();
	const { categoriesMap } = useCategories();

	const products = categoriesMap[category];

	return (
		<div>
			<h1>{category}</h1>

			<div className="grid grid-cols-4 gap-x-2 gap-y-12">
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default Category;
