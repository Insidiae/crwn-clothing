import * as React from "react";
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase";

const UserContext = React.createContext({
	currentUser: null,
	setCurrentUser: () => null,
});
UserContext.displayName = "UserContext";

function UserProvider(props) {
	const [currentUser, setCurrentUser] = React.useState(null);
	const value = { currentUser, setCurrentUser };

	React.useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return <UserContext.Provider value={value} {...props} />;
}

function useUser() {
	const context = React.useContext(UserContext);

	if (context === undefined) {
		throw new Error(`useUser must be used within a UserProvider`);
	}

	return context;
}

export { UserProvider, useUser };
