const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
    },
  },
};

export default config;
