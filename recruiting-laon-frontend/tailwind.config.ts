import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				gray: {
					100: "#1F1D2F",
					200: "#282639",
					300: "#48465B",
					400: "#636177",
					500: "#9895B4",
				},
				background: {
					DEFAULT: "hsl(var(--background))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
				},
				primaryLight: {
					DEFAULT: "hsl(var(--primary-light))",
				},
				primaryDark: {
					DEFAULT: "hsl(var(--primary-dark))",
				},
				negative: {
					DEFAULT: "hsl(var(--negative))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
				},
				successful: {
					DEFAULT: "hsl(var(--successful))",
				},
				informational: {
					DEFAULT: "hsl(var(--informational))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
};
export default config;
