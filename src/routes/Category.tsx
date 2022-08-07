import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

import {
	selectCategoriesMap,
	selectCategoriesStatus,
} from "../store/categories/categoriesSelector";

type CategoryRouteParams = {
	category: string;
};

function Category() {
	const categoriesStatus = useSelector(selectCategoriesStatus);
	const categoriesMap = useSelector(selectCategoriesMap);
	const { category } = useParams<CategoryRouteParams>() as CategoryRouteParams;

	const products = categoriesMap[category].items;

	return (
		<>
			<h2 className="mb-6 font-bold text-4xl text-center uppercase">
				{category}
			</h2>
			{categoriesStatus === "pending" ? <Spinner /> : null}
			{categoriesStatus === "resolved" ? (
				<div className="grid grid-cols-4 gap-x-2 gap-y-12">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : null}
		</>
	);
}

export default Category;
