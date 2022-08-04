import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import Shop from "./routes/Shop";
import Authentication from "./routes/Authentication";
import Checkout from "./routes/Checkout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;
