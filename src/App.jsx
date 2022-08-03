import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import Authentication from "./routes/Authentication";

function Shop() {
	return <h2>Shop Page</h2>;
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
			</Route>
		</Routes>
	);
}

export default App;
