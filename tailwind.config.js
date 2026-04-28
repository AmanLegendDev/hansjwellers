/** @type {import('tailwindcss').Config} */

module.exports = {

content: [

"./app/**/*.{js,ts,jsx,tsx}",

"./components/**/*.{js,ts,jsx,tsx}"

],

theme: {

extend: {

colors: {

primary: "#0F2A44",

gold: "#D4AF37",

ivory: "#FAF8F3",

text: "#1A1A1A",

borderSoft: "#ECECEC"

},

fontFamily: {

heading: ["var(--font-playfair)"],

body: ["var(--font-inter)"]

},

borderRadius: {

xl2: "1.25rem",

luxury: "14px"

},

boxShadow: {

soft:

"0 4px 18px rgba(0,0,0,0.04)",

luxury:

"0 10px 40px rgba(0,0,0,0.08)"

},

spacing: {

section: "80px"

}

}

},

plugins: []

};