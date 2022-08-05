import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../store/cart/cartSelector";
import {
	reduceItemFromCart,
	addItemToCart,
	removeItemFromCart,
} from "../store/cart/cartAction";

function CheckoutItem({ cartItem }) {
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	function handleDecrementItem() {
		dispatch(reduceItemFromCart(cartItems, cartItem));
	}

	function handleAddItem() {
		dispatch(addItemToCart(cartItems, cartItem));
	}

	function handleRemoveItem() {
		dispatch(removeItemFromCart(cartItems, cartItem));
	}

	return (
		<div className="w-full min-h-[100px] py-4 border-b border-b-gray-600 flex items-center text-xl">
			<div className="w-[23%] pr-4">
				<img
					src={cartItem.imageUrl}
					alt={cartItem.name}
					className="w-full h-full aspect-square object-cover"
				/>
			</div>
			<span className="w-[23%]"> {cartItem.name} </span>
			<span className="w-[23%] flex">
				<div className="cursor-pointer" onClick={handleDecrementItem}>
					&#10094;
				</div>
				<span className="my-0 mx-2">{cartItem.quantity}</span>
				<div className="cursor-pointer" onClick={handleAddItem}>
					&#10095;
				</div>
			</span>
			<span className="w-[23%]"> {cartItem.price}</span>
			<div
				className="pl-3 font-bold cursor-pointer hover:text-red-600"
				onClick={handleRemoveItem}
			>
				&#10005;
			</div>
		</div>
	);
}

export default CheckoutItem;
