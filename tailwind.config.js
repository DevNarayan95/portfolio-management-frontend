/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        success: "#059669",
        danger: "#dc2626",
        warning: "#f59e0b",
        light: "#f8fafc",
        dark: "#1e293b",
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 15px rgba(0, 0, 0, 0.08)",
        hover: "0 8px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
