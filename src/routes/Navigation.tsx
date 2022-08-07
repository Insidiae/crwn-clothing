import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../components/CartIcon";
import CartDropdown from "../components/CartDropdown";

import { selectCurrentUser } from "../store/user/userSelector";
import { selectIsCartOpen } from "../store/cart/cartSlice";

import { ReactComponent as CrwnLogo } from "../assets/crown.svg";
import { signOutStart } from "../store/user/userAction";

function Navigation() {
	const dispatch = useDispatch();

	// const currentUser = useSelector(selectCurrentUser);
	const currentUser = undefined;

	const isCartOpen = useSelector(selectIsCartOpen);

	const handleSignOut = () => dispatch(signOutStart());

	return (
		<div className="py-5 px-10">
			<div className="w-full h-16 mb-6 flex justify-between">
				<Link to="/" className="relative w-16 h-full p-6">
					<CrwnLogo />
				</Link>
				<div className="w-1/2 h-full flex justify-end items-center">
					<Link to="/shop" className="py-2 px-4 uppercase cursor-pointer">
						Shop
					</Link>
					{currentUser ? (
						<span
							className="py-2 px-4 uppercase cursor-pointer"
							onClick={handleSignOut}
						>
							Sign Out
						</span>
					) : (
						<Link to="/auth" className="py-2 px-4 uppercase cursor-pointer">
							Sign In
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen ? <CartDropdown /> : null}
			</div>

			<Outlet />
		</div>
	);
}

export default Navigation;
