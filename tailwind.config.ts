import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: "#1A042F",
                secondary: "#4B0082", // TODO: Test #4B0082, #483D8B, #4C2D6F, #7B3E92 and
                contrast: "#DB3A34",
                bitcoin: "#F7931A",
                testLightBlue: "#00CED1",
            },
        },
    },
    plugins: [],
}
export default config
