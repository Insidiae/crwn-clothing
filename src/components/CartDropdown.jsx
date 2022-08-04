import * as React from "react";
import Button from "./Button";

function CartDropdown() {
	return (
		<div className="absolute top-24 right-10 w-60 h-[340px] p-5 border border-black bg-white flex flex-col z-[5]">
			<div className="h-60 flex flex-col overflow-scroll"></div>
			<Button className="mt-auto">Go to Checkout</Button>
		</div>
	);
}

export default CartDropdown;
