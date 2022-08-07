import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import CategoriesPreview from "./routes/CategoriesPreview";
import Category from "./routes/Category";
import Authentication from "./routes/Authentication";
import Checkout from "./routes/Checkout";

import { fetchCategories } from "./store/categories/categoriesSlice";
import { checkUserSession } from "./store/user/userAction";

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(checkUserSession());
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop">
					<Route index element={<CategoriesPreview />} />
					<Route path=":category" element={<Category />} />
				</Route>
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;
