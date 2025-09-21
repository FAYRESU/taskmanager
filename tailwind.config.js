/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bluegreen: {
          "primary": "#00bcd4", // Cyan-like blue
          "secondary": "#4caf50", // Green
          "accent": "#ffc107", // Amber
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#2196f3",
          "success": "#4caf50",
          "warning": "#ff9800",
          "error": "#f44336",
        },
      },
      "light", // Fallback to light theme
      "dark", // Fallback to dark theme
    ],
  },
}
}