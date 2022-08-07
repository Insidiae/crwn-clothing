import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../components/CartIcon";
import CartDropdown from "../components/CartDropdown";

import { selectCurrentUser, signOut } from "../store/user/userSlice";
import { selectIsCartOpen } from "../store/cart/cartSlice";

import type { AppDispatch } from "../store/store";

import { ReactComponent as CrwnLogo } from "../assets/crown.svg";

function Navigation() {
	const dispatch = useDispatch<AppDispatch>();

	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const handleSignOut = () => dispatch(signOut());

	return (
		<div className="py-2.5 px-5 md:py-5 md:px-10">
			<div className="w-full h-14 mb-5 flex justify-between md:h-16 md:mb-6">
				<Link to="/" className="relative w-12 h-full p-0 md:w-16 md:p-6">
					<CrwnLogo />
				</Link>
				<div className="w-4/5 h-full flex justify-end items-center md:w-1/2">
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
