import * as React from "react";

import { ReactComponent as ShoppingBagIcon } from "../assets/shopping-bag.svg";
import { useCart } from "../context/cartContext";

function CartIcon() {
	const { setIsCartOpen } = useCart();

	function toggleCart() {
		setIsCartOpen((prevState) => !prevState);
	}

	return (
		<div
			className="relative w-11 h-11 flex justify-center items-center cursor-pointer"
			onClick={toggleCart}
		>
			<ShoppingBagIcon className="w-6 h-6" />
			<span className="absolute bottom-3 text-xs font-bold">0</span>
		</div>
	);
}

export default CartIcon;
