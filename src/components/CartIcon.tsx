import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCartCount, setIsCartOpen } from "../store/cart/cartSlice";

import { ReactComponent as ShoppingBagIcon } from "../assets/shopping-bag.svg";

function CartIcon() {
	const cartCount = useSelector(selectCartCount);
	const dispatch = useDispatch();

	function toggleCart() {
		dispatch(setIsCartOpen((prevState: boolean) => !prevState));
	}

	return (
		<div
			className="relative w-11 h-11 flex justify-center items-center cursor-pointer"
			onClick={toggleCart}
		>
			<ShoppingBagIcon className="w-6 h-6" />
			<span className="absolute bottom-3 text-xs font-bold">{cartCount}</span>
		</div>
	);
}

export default CartIcon;
