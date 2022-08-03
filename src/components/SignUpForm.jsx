import * as React from "react";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../utils/firebase";
import Button from "./Button";
import FormInput from "./FormInput";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function SignUpForm() {
	const [formFields, setFormFields] = React.useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	function handleChange(event) {
		const { name, value } = event.currentTarget;

		setFormFields({ ...formFields, [name]: value });
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			const response = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			if (response) {
				await createUserDocumentFromAuth(response.user, { displayName });

				setFormFields(defaultFormFields);
			}
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				alert("Email alredy in use!");
			} else {
				console.error("There was an error in signing up:", err.message);
			}
		}
	}

	return (
		<div className="w-96 flex flex-col">
			<h2 className="my-2 mx-0 text-xl font-bold">
				Don&apos;t have an account?
			</h2>
			<span>Sign up with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					required
					type="text"
					name="displayName"
					id="signup-display-name"
					label="Display Name"
					value={displayName}
					onChange={handleChange}
				/>
				<FormInput
					required
					type="email"
					name="email"
					id="signup-email"
					label="Email"
					value={email}
					onChange={handleChange}
				/>
				<FormInput
					required
					type="password"
					name="password"
					id="signup-password"
					label="Password"
					value={password}
					onChange={handleChange}
				/>
				<FormInput
					required
					type="password"
					name="confirmPassword"
					id="signup-confirm-password"
					label="Confirm Password"
					value={confirmPassword}
					onChange={handleChange}
				/>

				<div className="flex justify-between">
					<Button type="submit">Sign up</Button>
				</div>
			</form>
		</div>
	);
}

export default SignUpForm;
