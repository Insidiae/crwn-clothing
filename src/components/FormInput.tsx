import * as React from "react";

type FormInputProps = {
	id?: string;
	label?: string;
	name?: string;
};

function FormInput({
	id,
	label,
	name,
	...otherProps
}: React.InputHTMLAttributes<HTMLInputElement> & FormInputProps) {
	const passwordStyles = otherProps.type === "password" ? "tracking-wide" : "";

	const shouldShrink = Boolean(
		otherProps.value &&
			typeof otherProps.value === "string" &&
			otherProps.value.length
	);
	const labelShrinkStyles = shouldShrink
		? "-top-3 text-xs text-black"
		: "top-2 text-base text-gray-500";

	return (
		<div className="relative my-11 mx-0">
			<input
				id={id}
				name={name}
				className={`peer block w-full my-6 mx-0 py-2 pr-1 pl-0 rounded-none border-b border-gray-500 bg-none bg-white text-gray-500 text-lg ${passwordStyles} focus:outline-none`}
				{...otherProps}
			/>
			{label ? (
				<label
					htmlFor={id}
					className={`absolute left-1 transition-all delay-300 ease-in-out pointer-events-none ${labelShrinkStyles} peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black`}
				>
					{label}
				</label>
			) : null}
		</div>
	);
}

export default FormInput;
