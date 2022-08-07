import * as React from "react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

import type { CategoryItem } from "../store/categories/categoriesTypes";

function CategoryPreview({
	categoryKey,
	products,
}: {
	categoryKey: string;
	products: CategoryItem[];
}) {
	return (
		<div className="mb-7 flex flex-col">
			<h2 className="mt-3 mb-6">
				<Link
					to={`/shop/${categoryKey}`}
					className="font-bold text-3xl uppercase cursor-pointer"
				>
					{categoryKey}
				</Link>
			</h2>
			<div className="grid grid-cols-1 gap-x-2 gap-y-12 xs:grid-cols-2 md:grid-cols-4">
				{products.slice(0, 4).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default CategoryPreview;
