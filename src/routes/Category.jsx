import * as React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import { useCategories } from "../context/categoriesContext";

function Category() {
	const { category } = useParams();
	const { categoriesMap } = useCategories();

	const products = categoriesMap[category].items;

	return (
		<>
			<h2 className="mb-6 font-bold text-4xl text-center uppercase">
				{category}
			</h2>
			<div className="grid grid-cols-4 gap-x-2 gap-y-12">
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
}

export default Category;
