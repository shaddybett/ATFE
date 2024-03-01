/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif',],
        'poppins': ['Poppins', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        'm-orange': '#C14618',
        'light-orange': 'rgba(248,85,24,0.1)',
        't-orange': 'rgba(248,85,24,0.2)',
        'navy-blue': '#001F3F', // Add navy blue to your color palette
        light: 'rgba(21,20,25,0.1)',
      },
      boxShadow: {
        'bs-light': '0px 0px 15px 0px rgba(21,20,25,0.1)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
