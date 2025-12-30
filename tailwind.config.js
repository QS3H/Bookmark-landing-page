module.exports = {
  content: ["./*.html", "./src/**/*.ts"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightBlue: "hsl(231, 69%, 60%)",
        lightRed: "hsl(0, 94%, 66%)",
        grayishBlue: "hsl(229, 8%, 60%)",
        veryDarkBlue: "hsl(229, 31%, 21%)",
        // Dark mode colors
        darkBg: "hsl(229, 31%, 12%)",
        darkCard: "hsl(229, 31%, 18%)",
        darkText: "hsl(0, 0%, 90%)",
        darkTextMuted: "hsl(229, 8%, 70%)",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      backgroundImage: () => ({
        dots: "url('../images/bg-dots.svg')",
      }),
    },
  },
  plugins: [],
};
