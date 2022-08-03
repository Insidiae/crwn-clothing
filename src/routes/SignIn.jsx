import * as React from "react";

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../utils/firebase";

function SignIn() {
	async function logGoogleUser() {
		const { user } = await signInWithGooglePopup();

		const userDocRef = await createUserDocumentFromAuth(user);
	}

	return (
		<div>
			<h1>Sign In to CRWN</h1>
			<button onClick={logGoogleUser}>Sign in with Google</button>
		</div>
	);
}

export default SignIn;
