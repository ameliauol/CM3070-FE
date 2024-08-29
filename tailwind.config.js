/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS and TS files
  ],
  theme: {
    extend: {
      spacing: {
        1.5: "0.375rem", // 6px
        2.5: "0.625rem", // 10px
        7: "1.75rem", // 28px
        9: "2.25rem", // 36px
        11: "2.75rem", // 44px
        13: "3.25rem", // 52px
        15: "3.75rem", // 60px
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        28: "7rem", // 112px
        30: "7.5rem", // 120px
        35: "8.75rem", // 140px
        // ... add more custom rem values as needed
      },
      height: {
        70: "17.5rem",
      },
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
