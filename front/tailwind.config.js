/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue':'#3182CE',
        'cyan':'#00B5D8',
        'teal':'#81E6D9',
        'red':'#E53E3E',
        'zinc':'rgba(20, 20, 20, 0.15)',
        'black':'rgba(20, 20, 20, 1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
