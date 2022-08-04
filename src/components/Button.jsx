import * as React from "react";

function Button({ children, className, theme = "default", ...otherProps }) {
	const themeStyle = buttonThemeStyles[theme];

	return (
		<button
			className={`min-w-[10rem] w-auto h-12 py-0 px-9 border flex justify-center items-center text-base font-bold uppercase tracking-[0.5px] cursor-pointer transition ${themeStyle} ${className}`}
			{...otherProps}
		>
			{children}
		</button>
	);
}

const buttonThemeStyles = {
	default:
		"bg-black text-white border-transparent hover:border-black hover:bg-white hover:text-black",
	google: "bg-blue-600 text-white hover:border-transparent hover:bg-blue-400",
	inverted:
		"bg-white text-black border-black hover:border-transparent hover:bg-black hover:text-white",
};

export default Button;
