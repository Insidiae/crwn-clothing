import * as React from "react";
import ProductCard from "../components/ProductCard";

import { useProducts } from "../context/productsContext";

function Shop() {
	const { products } = useProducts();
	return (
		<div className="grid grid-cols-4 gap-x-2 gap-y-12">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

export default Shop;
