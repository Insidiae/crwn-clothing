import * as React from "react";

function Button({ children, theme = "default", ...otherProps }) {
	const themeStyle = buttonThemeStyles[theme];

	return (
		<button
			className={`min-w-[10rem] w-auto h-1/2 py-4 px-9 border-none flex justify-center text-base font-bold uppercase tracking-[0.5px] cursor-pointer transition ${themeStyle}`}
			{...otherProps}
		>
			{children}
		</button>
	);
}

const buttonThemeStyles = {
	default:
		"bg-black text-white hover:border hover:border-black hover:bg-white hover:text-black",
	google: "bg-blue-600 text-white hover:border-none hover:bg-blue-400",
	inverted:
		"bg-white text-black border border-black hover:border-none hover:bg-black hover:text-white",
};

export default Button;
