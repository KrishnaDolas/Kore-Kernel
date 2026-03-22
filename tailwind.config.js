// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 60s linear infinite",
        "subtle-zoom": "subtle-zoom 20s ease-in-out infinite",
        "fade-in": "fade-in 1s ease-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "subtle-zoom": {
          "0%, 100%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(1.08)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
