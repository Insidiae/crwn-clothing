import * as React from "react";
import { useDispatch } from "react-redux";

import Button from "./Button";

import { addItemToCart } from "../store/cart/cartSlice";

import type { CategoryItem } from "../store/categories/categoriesTypes";

function ProductCard({ product }: { product: CategoryItem }) {
	const dispatch = useDispatch();

	function addProductToCart() {
		dispatch(addItemToCart(product));
	}

	return (
		<div className="group relative w-full h-96 flex flex-col items-center">
			<img
				src={product.imageUrl}
				alt={product.name}
				className="w-full h-[95%] aspect-square mb-1 object-cover transition group-hover:opacity-80"
			/>
			<div className="w-full h-[5%] flex justify-between text-lg">
				<span className="w-11/12 mb-4">{product.name}</span>
				<span className="w-1/12">{product.price}</span>
			</div>
			<Button
				theme="inverted"
				className="absolute hidden top-64 w-4/5 opacity-0 group-hover:flex group-hover:opacity-80"
				onClick={addProductToCart}
			>
				Add to Cart
			</Button>
		</div>
	);
}

export default ProductCard;
