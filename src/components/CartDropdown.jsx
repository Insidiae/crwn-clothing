import * as React from "react";

import Button from "./Button";
import CartItem from "./CartItem";

import { useCart } from "../context/cartContext";

function CartDropdown() {
	const { cartItems } = useCart();

	return (
		<div className="absolute top-24 right-10 w-60 h-[340px] p-5 border border-black bg-white flex flex-col z-[5]">
			<div className="h-60 flex flex-col overflow-scroll">
				{cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} cartItem={cartItem} />
				))}
			</div>
			<Button className="mt-auto">Go to Checkout</Button>
		</div>
	);
}

export default CartDropdown;
