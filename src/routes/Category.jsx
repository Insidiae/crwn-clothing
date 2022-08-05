import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import { selectCategoriesMap } from "../store/categories/categoriesSelector";

function Category() {
	const categoriesMap = useSelector(selectCategoriesMap);
	const { category } = useParams();

	const products = categoriesMap[category]?.items;

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
