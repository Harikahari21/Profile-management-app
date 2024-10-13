/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B4E9B",
        secondary: "#0EA861",
        facebook: "#4267B2",
        instagram: "#bc2a8d",
        twitter: "#1da1f2",
        linkedin: "#D97706",
        pinterest: "#E60023",
        whatsapp: "#25d366",
        youtube: "#cd201f",
        light: "#eaedf7",
        dark: "#0e0e23",
        "pink-blue": "#6259ca",
      },
      fontSize: {
        small: "15px",
      },

      textColor: {
        "primary-text": "#5d596c",
      },
    },
  },
  plugins: [],
};
