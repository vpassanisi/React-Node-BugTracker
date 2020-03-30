const materialPalette = require("./materialPalette.js");

module.exports = {
  theme: {
    boxShadow: {
      default:
        "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
    },
    extend: {
      width: {
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "4/8": "50%",
        "5/8": "62.5%",
        "6/8": "75%",
        "7/8": "87.5%"
      }
    },
    colors: materialPalette,
    alphaColors: ["deep-purple.500", "gray.800"]
  },
  variants: {
    backgroundColor: ["dark", "hover"],
    textColor: ["dark"]
  },
  plugins: [
    require("tailwindcss-bg-alpha")(),
    require("tailwindcss-dark-mode")()
  ]
};
