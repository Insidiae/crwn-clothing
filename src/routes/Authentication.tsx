import * as React from "react";

import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

function Authentication() {
	return (
		<div className="w-[900px] my-8 mx-auto flex justify-between">
			<SignInForm />
			<SignUpForm />
		</div>
	);
}

export default Authentication;
