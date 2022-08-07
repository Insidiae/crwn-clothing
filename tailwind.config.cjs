/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		screens: {
			xs: "400px",
			...screens,
		},
	},
	plugins: [],
};
