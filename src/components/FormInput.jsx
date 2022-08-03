import * as React from "react";

function FormInput({ label, name, ...otherProps }) {
	const passwordStyles = otherProps.type === "password" ? "tracking-wide" : "";
	const labelShrinkStyles = otherProps.value.length
		? "-top-3 text-xs text-black"
		: "left-1 top-2 text-base";

	return (
		<div className="relative my-11 mx-0">
			<input
				id={name}
				name={name}
				className={`peer block w-full my-6 mx-0 py-2 pr-1 pl-0 rounded-none border-b border-gray-500 bg-none bg-white text-gray-500 text-lg ${passwordStyles} focus:outline-none`}
				{...otherProps}
			/>
			{label ? (
				<label
					htmlFor={name}
					className={`absolute text-gray-500 transition-all delay-300 ease-in-out pointer-events-none ${labelShrinkStyles} peer-empty:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black`}
				>
					{label}
				</label>
			) : null}
		</div>
	);
}

export default FormInput;
