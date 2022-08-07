import * as React from "react";
import { useSelector } from "react-redux";

import CheckoutItem from "../components/CheckoutItem";
import PaymentForm from "../components/PaymentForm";

import { selectCartItems, selectCartTotal } from "../store/cart/cartSlice";

function Checkout() {
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

	return (
		<div className="w-7/12 min-h-[90vh] mt-12 mx-auto mb-0 flex flex-col items-center">
			<div className="w-full py-2 px-0 border-b border-b-gray-600 flex justify-between">
				<div className="w-[23%] capitalize">
					<span>Product</span>
				</div>
				<div className="w-[23%] capitalize">
					<span>Description</span>
				</div>
				<div className="w-[23%] capitalize">
					<span>Quantity</span>
				</div>
				<div className="w-[23%] capitalize">
					<span>Price</span>
				</div>
				<div className="w-[8%] capitalize">
					<span>Remove</span>
				</div>
			</div>

			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}

			<span className="mt-7 ml-auto text-4xl">Total: ${cartTotal}</span>

			<PaymentForm />
		</div>
	);
}

export default Checkout;
