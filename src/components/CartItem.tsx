import * as React from "react";

import type { CartItem as CartItemType } from "../store/cart/cartTypes";

function CartItem({ cartItem }: { cartItem: CartItemType }) {
	return (
		<div className="w-full h-20 mb-4 flex">
			<img
				src={cartItem.imageUrl}
				alt={cartItem.name}
				className="w-1/3 aspect-square object-cover"
			/>
			<div className="w-2/3 py-2 px-4 flex flex-col justify-center items-start">
				<span className="text-base">{cartItem.name}</span>
				<span className="text-sm">
					{cartItem.quantity} &times; ${cartItem.price}
				</span>
			</div>
		</div>
	);
}

export default CartItem;
