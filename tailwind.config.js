/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
    plugins: [require("flowbite/plugin")],
    theme: {
        extend: {
            colors: {
                websiteWhite: "#F8F8FE",
                websiteBlue: "#4170FF",
            },
        },
    },
};
