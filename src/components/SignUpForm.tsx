import * as React from "react";
import { useDispatch } from "react-redux";
import { AuthErrorCodes } from "firebase/auth";

import Button from "./Button";
import FormInput from "./FormInput";

import { signUpStart } from "../store/user/userAction";

import type { AuthError } from "firebase/auth";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function SignUpForm() {
	const dispatch = useDispatch();

	const [formFields, setFormFields] = React.useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.currentTarget;

		setFormFields({ ...formFields, [name]: value });
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			dispatch(signUpStart(email, password, displayName));
			setFormFields(defaultFormFields);
		} catch (err) {
			if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
				alert("Email alredy in use!");
			} else {
				console.error("There was an error in signing up:", err);
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
