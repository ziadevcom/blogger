/** @type {import('tailwindcss').Config} */

import { theme as chakraTheme } from "@chakra-ui/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: chakraTheme.colors.green[50],
          100: chakraTheme.colors.green[100],
          200: chakraTheme.colors.green[200],
          300: chakraTheme.colors.green[300],
          400: chakraTheme.colors.green[400],
          500: chakraTheme.colors.green[500],
          600: chakraTheme.colors.green[600],
          700: chakraTheme.colors.green[700],
          800: chakraTheme.colors.green[800],
          900: chakraTheme.colors.green[900],
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
