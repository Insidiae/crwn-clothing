import * as React from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase";
import { createAction } from "../utils/reducer";

const UserContext = React.createContext({
	currentUser: null,
	setCurrentUser: () => {},
});
UserContext.displayName = "UserContext";

function userReducer(state, action) {
	switch (action.type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: action.payload };
		default:
			throw new Error(`Invalid action type "${action.type}".`);
	}
}

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
	currentUser: null,
};

function UserProvider(props) {
	const [state, dispatch] = React.useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;

	function setCurrentUser(user) {
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
	}

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
