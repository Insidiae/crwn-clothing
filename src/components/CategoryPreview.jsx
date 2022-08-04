import * as React from "react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

function CategoryPreview({ categoryKey, products }) {
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
			<div className="grid grid-cols-4 gap-x-2">
				{products.slice(0, 4).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default CategoryPreview;
