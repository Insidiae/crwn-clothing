import * as React from "react";

import { getCategoriesAndDocuments } from "../utils/firebase";

const CategoriesContext = React.createContext({
	categoriesMap: {},
	setCategoriesMap: () => {},
});
CategoriesContext.displayName = "CategoriesContext";

function CategoriesProvider(props) {
	const [categoriesMap, setCategoriesMap] = React.useState({});

	React.useEffect(() => {
		getCategoriesAndDocuments().then((categoriesMap) => {
			setCategoriesMap(categoriesMap);
		});
	}, []);

	const value = { categoriesMap, setCategoriesMap };

	return <CategoriesContext.Provider value={value} {...props} />;
}

function useCategories() {
	const context = React.useContext(CategoriesContext);

	if (context === undefined) {
		throw new Error(`useCategories must be used within a CategoriesProvider`);
	}

	return context;
}

export { CategoriesProvider, useCategories };
