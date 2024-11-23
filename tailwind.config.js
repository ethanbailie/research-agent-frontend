/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  variants: {
    extend: {
      selection: ['responsive'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins, sans-serif"],
      },
      gridTemplateColumns: {
        sidebar: "200px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      space: {
        "5px": "5px",
      },
    
    },
  },
  plugins: [],
};
