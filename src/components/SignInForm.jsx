import * as React from "react";
import { useDispatch } from "react-redux";

import Button from "./Button";
import FormInput from "./FormInput";

import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from "../utils/firebase";
import { googleSignInStart, emailSignInStart } from "../store/user/userAction";

const defaultFormFields = {
	email: "",
	password: "",
};

function SignInForm() {
	const dispatch = useDispatch();

	const [formFields, setFormFields] = React.useState(defaultFormFields);
	const { email, password } = formFields;

	function handleChange(event) {
		const { name, value } = event.currentTarget;

		setFormFields({ ...formFields, [name]: value });
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			setFormFields(defaultFormFields);
		} catch (err) {
			if (
				err.code === "auth/wrong-password" ||
				err.code === "auth/user-not-found"
			) {
				alert("Incorrect username or password.");
			} else {
				console.error("There was an error in signing in:", err.message);
			}
		}
	}

	async function handleGoogleSignIn() {
		dispatch(googleSignInStart());
	}

	return (
		<div className="w-96 flex flex-col">
			<h2 className="my-2 mx-0 text-xl font-bold">Already have an account?</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					required
					type="email"
					name="email"
					id="signin-email"
					label="Email"
					value={email}
					onChange={handleChange}
				/>
				<FormInput
					required
					type="password"
					name="password"
					id="signin-password"
					label="Password"
					value={password}
					onChange={handleChange}
				/>

				<div className="flex justify-between">
					<Button type="submit">Sign in</Button>
					<Button type="button" theme="google" onClick={handleGoogleSignIn}>
						Sign in with Google
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SignInForm;
