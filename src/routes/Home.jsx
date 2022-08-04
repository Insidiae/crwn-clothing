import * as React from "react";
import { Outlet } from "react-router-dom";

import Directory from "../components/Directory";

function Home() {
	return (
		<div>
			<Directory />
			<Outlet />
		</div>
	);
}

export default Home;
