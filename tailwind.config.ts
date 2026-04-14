import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1f8ffd",
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#1f8ffd",
                    600: "#1d7ae6",
                    700: "#1763bf",
                    800: "#154f96",
                    900: "#164278",
                },
                secondary: {
                    DEFAULT: "#e0db1d",
                    50: "#fbffe4",
                    100: "#f4ffc1",
                    200: "#e8ff89",
                    300: "#d4fd46",
                    400: "#b9f71a",
                    500: "#e0db1d",
                    600: "#a7a20c",
                    700: "#7e7b0e",
                    800: "#646113",
                    900: "#545115",
                },
                gold: {
                    400: "#e0db1d",
                    500: "#e0db1d",
                }
            },
            fontFamily: {
                sans: ["Montserrat", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};

export default config;
