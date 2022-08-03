import * as React from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../assets/crown.svg";

function Navigation() {
	return (
		<>
			<div className="w-full h-16 mb-6 flex justify-between">
				<Link to="/" className="relative w-16 h-full p-6">
					<CrwnLogo />
				</Link>
				<div className="w-1/2 h-full flex justify-end items-center">
					<Link to="/shop" className="py-2 px-4 uppercase cursor-pointer">
						Shop
					</Link>
					<Link to="/auth" className="py-2 px-4 uppercase cursor-pointer">
						Sign In
					</Link>
				</div>
			</div>

			<Outlet />
		</>
	);
}

export default Navigation;
