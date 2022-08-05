import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import CategoriesPreview from "./routes/CategoriesPreview";
import Category from "./routes/Category";
import Authentication from "./routes/Authentication";
import Checkout from "./routes/Checkout";

import { setCurrentUser } from "./store/user/userAction";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "./utils/firebase";

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});

		return () => {
			unsubscribe();
		};
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
