/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  rippleui: {
    themes: [
			{
				themeName: "light",
				colorScheme: "light",
				colors: {
					primary: "#15803d",
          secondary: "#0369a1",
				},
			},
			{
				themeName: "dark",
				colorScheme: "dark",
				colors: {
					primary: "#16a34a",
          secondary: "#0284c7",
				},
			},
		],
  },
  plugins: [require("rippleui")],
};
